#!/usr/bin/env python3
"""Ground truth cho HW05 Task 2.

Khac voi analyze_jtl.py mac dinh: file .jtl nay chua CA Transaction Controller
row lan HTTP sampler row (moi TC boc dung 1 sampler -> row bi nhan doi).
Script nay tach hai loai, loai bo 50 TC row artifact (threadName rong sinh ra
luc JMeter shutdown), va gop cac label bi no cardinality
(PUT /api/orders/<id>/cancel, GET /api/products/<n>).
"""
import csv, re, math, sys, json
from collections import defaultdict

TC_RE = re.compile(r'^\d\d - ')
CANCEL_RE = re.compile(r'^PUT /api/orders/.*/cancel$')
DETAIL_RE = re.compile(r'^GET /api/products/\d+$')


def pct(sorted_vals, p):
    if not sorted_vals:
        return None
    n = len(sorted_vals)
    rank = max(1, min(math.ceil(p / 100.0 * n), n))
    return sorted_vals[rank - 1]


def stats(vals):
    if not vals:
        return None
    s = sorted(vals)
    return dict(n=len(s), min=s[0], max=s[-1], mean=round(sum(s) / len(s), 1),
                p50=pct(s, 50), p90=pct(s, 90), p95=pct(s, 95), p99=pct(s, 99))


def norm(label):
    if CANCEL_RE.match(label):
        return 'PUT /api/orders/:id/cancel'
    if DETAIL_RE.match(label):
        return 'GET /api/products/:id'
    return label


def load(path):
    tc, sm, artifacts = [], [], 0
    with open(path, newline='', encoding='utf-8', errors='replace') as f:
        for r in csv.DictReader(f):
            try:
                row = dict(ts=int(r['timeStamp']), elapsed=int(r['elapsed']),
                           label=r['label'], ok=r['success'].strip().lower() == 'true',
                           code=r.get('responseCode', ''), thread=r.get('threadName', ''),
                           threads=int(r['allThreads']) if r.get('allThreads', '').isdigit() else None,
                           latency=int(r['Latency']) if r.get('Latency', '').isdigit() else None,
                           connect=int(r['Connect']) if r.get('Connect', '').isdigit() else None)
            except (ValueError, KeyError):
                continue
            if TC_RE.match(row['label']):
                if not row['thread']:
                    artifacts += 1
                    continue
                tc.append(row)
            else:
                sm.append(row)
    tc.sort(key=lambda x: x['ts']); sm.sort(key=lambda x: x['ts'])
    return tc, sm, artifacts


def summarize(rows, name):
    if not rows:
        return None
    dur = (max(r['ts'] + r['elapsed'] for r in rows) - min(r['ts'] for r in rows)) / 1000.0
    err = sum(1 for r in rows if not r['ok'])
    st = stats([r['elapsed'] for r in rows])
    return dict(scope=name, samples=len(rows), duration_s=round(dur, 1),
                rps=round(len(rows) / dur, 2) if dur > 0 else None,
                errors=err, err_pct=round(err / len(rows) * 100, 3), rt=st)


def steady(rows, tol=0.9):
    th = [r for r in rows if r['threads'] is not None]
    if not th:
        return None
    peak = max(r['threads'] for r in th)
    cut = peak * tol
    inside = [r for r in th if r['threads'] >= cut]
    if not inside:
        return None
    return dict(peak=peak, cutoff=round(cut, 1), start=inside[0]['ts'], end=inside[-1]['ts'])


def report(path, window=0):
    tc, sm, artifacts = load(path)
    print('\n' + '#' * 74)
    print('# FILE: %s' % path.split('/')[-1])
    print('#' * 74)
    print('Transaction Controller rows (da loai %d artifact threadName rong): %d' % (artifacts, len(tc)))
    print('HTTP sampler rows                                              : %d' % len(sm))
    print('Tong row trong file                                            : %d' % (len(tc) + len(sm) + artifacts))
    print('=> Chi %d HTTP request THAT SU duoc gui toi backend.' % len(sm))

    ov = summarize(sm, 'toan file (HTTP sampler)')
    st = steady(sm)
    print('\n--- TOAN FILE (chi HTTP sampler) ---')
    print('samples=%(samples)d  duration=%(duration_s)ss  RPS=%(rps)s  errors=%(errors)d (%(err_pct)s%%)' % ov)
    print('  p50=%(p50)s p90=%(p90)s p95=%(p95)s p99=%(p99)s  mean=%(mean)s max=%(max)s' % ov['rt'])

    if st:
        srows = [r for r in sm if st['start'] <= r['ts'] <= st['end']]
        ss = summarize(srows, 'steady')
        print('\n--- STEADY-STATE (allThreads >= %s, peak=%s) <== dung cho SLA ---' % (st['cutoff'], st['peak']))
        print('samples=%(samples)d  duration=%(duration_s)ss  RPS=%(rps)s  errors=%(errors)d (%(err_pct)s%%)' % ss)
        print('  p50=%(p50)s p90=%(p90)s p95=%(p95)s p99=%(p99)s  mean=%(mean)s max=%(max)s' % ss['rt'])

    print('\n--- THEO ENDPOINT (label da gop, toan file) ---')
    b = defaultdict(list)
    for r in sm:
        b[norm(r['label'])].append(r)
    print('%-30s %7s %8s %7s %7s %7s %8s %7s' % ('Endpoint', 'n', 'mean', 'p50', 'p90', 'p95', 'p99', 'Err%'))
    for k in sorted(b, key=lambda x: -stats([r['elapsed'] for r in b[x]])['p95']):
        rs = b[k]
        s = stats([r['elapsed'] for r in rs])
        e = sum(1 for r in rs if not r['ok'])
        print('%-30s %7d %8s %7s %7s %7s %8s %7s' % (k, s['n'], s['mean'], s['p50'], s['p90'],
                                                     s['p95'], s['p99'], round(e / len(rs) * 100, 2)))

    errs = defaultdict(int)
    for r in sm:
        if not r['ok']:
            errs['%s | code=%s' % (norm(r['label']), r['code'])] += 1
    if errs:
        print('\n--- PHAN RA LOI (chi HTTP sampler) ---')
        for k, v in sorted(errs.items(), key=lambda kv: -kv[1]):
            print('  %-58s %6d' % (k[:58], v))
    else:
        print('\n--- Khong co HTTP sampler nao that bai ---')

    lat = [r['latency'] for r in sm if r['latency'] is not None]
    con = [r['connect'] for r in sm if r['connect'] is not None]
    if lat:
        ls, cs = stats(lat), stats(con) if con else None
        print('\n--- LATENCY (TTFB) vs CONNECT ---')
        print('  Latency p50=%s p95=%s mean=%s' % (ls['p50'], ls['p95'], ls['mean']))
        if cs:
            print('  Connect p50=%s p95=%s mean=%s max=%s' % (cs['p50'], cs['p95'], cs['mean'], cs['max']))

    if window:
        print('\n--- XU HUONG THEO CUA SO %ds (theo allThreads de xac dinh bac tai) ---' % window)
        t0 = sm[0]['ts']
        buck = defaultdict(list)
        for r in sm:
            buck[int((r['ts'] - t0) / 1000 / window)].append(r)
        print('%-12s %7s %8s %7s %8s %8s %8s' % ('Window', 'n', 'RPS', 'p50', 'p95', 'Err%', 'threads'))
        for i in sorted(buck):
            rs = buck[i]
            s = stats([r['elapsed'] for r in rs])
            e = sum(1 for r in rs if not r['ok'])
            th = [r['threads'] for r in rs if r['threads'] is not None]
            print('%-12s %7d %8s %7s %8s %8s %8s' % ('%d-%ds' % (i * window, (i + 1) * window),
                  len(rs), round(len(rs) / window, 1), s['p50'], s['p95'],
                  round(e / len(rs) * 100, 2), round(sum(th) / len(th)) if th else '-'))


if __name__ == '__main__':
    w = int(sys.argv[2]) if len(sys.argv) > 2 else 0
    report(sys.argv[1], w)
