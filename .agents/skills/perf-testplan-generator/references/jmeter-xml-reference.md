# JMeter XML Reference

This file contains canonical XML blocks for common JMeter elements.
Use these as templates when reviewing AI-generated JMX output.

## Thread Group — steady load

```xml
<ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Load Thread Group" enabled="true">
  <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
  <elementProp name="ThreadGroup.main_controller" elementType="LoopController">
    <boolProp name="LoopController.continue_forever">false</boolProp>
    <intProp name="LoopController.loops">-1</intProp>
  </elementProp>
  <stringProp name="ThreadGroup.num_threads">50</stringProp>
  <stringProp name="ThreadGroup.ramp_time">120</stringProp>
  <boolProp name="ThreadGroup.scheduler">true</boolProp>
  <stringProp name="ThreadGroup.duration">600</stringProp>
  <stringProp name="ThreadGroup.delay">0</stringProp>
</ThreadGroup>
```

## CSV Data Set Config

```xml
<CSVDataSet guiclass="TestBeanGUI" testclass="CSVDataSet" testname="CSV Data Set Config" enabled="true">
  <stringProp name="filename">test_data.csv</stringProp>
  <stringProp name="fileEncoding">UTF-8</stringProp>
  <stringProp name="variableNames">email,password,product_id,keyword,quantity</stringProp>
  <boolProp name="ignoreFirstLine">true</boolProp>
  <stringProp name="delimiter">,</stringProp>
  <boolProp name="quotedData">false</boolProp>
  <boolProp name="recycle">true</boolProp>
  <boolProp name="stopThread">false</boolProp>
  <stringProp name="shareMode">shareMode.all</shareMode>
</CSVDataSet>
```

## HTTP Request Sampler

```xml
<HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="POST Login" enabled="true">
  <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
  <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
    <collectionProp name="Arguments.arguments">
      <elementProp name="" elementType="HTTPArgument">
        <boolProp name="HTTPArgument.always_encode">false</boolProp>
        <stringProp name="Argument.value">{"email": "${email}", "password": "${password}"}</stringProp>
        <stringProp name="Argument.metadata">=</stringProp>
      </elementProp>
    </collectionProp>
  </elementProp>
  <stringProp name="HTTPSampler.domain">${BASE_URL}</stringProp>
  <stringProp name="HTTPSampler.port"></stringProp>
  <stringProp name="HTTPSampler.protocol">http</stringProp>
  <stringProp name="HTTPSampler.path">/api/auth/login</stringProp>
  <stringProp name="HTTPSampler.method">POST</stringProp>
  <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
  <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
</HTTPSamplerProxy>
```

## JSON Extractor (token extraction)

```xml
<JSONPathExtractor guiclass="JSONPathExtractorGui" testclass="JSONPathExtractor" testname="Extract Token" enabled="true">
  <stringProp name="JSONPathExtractor.referenceNames">access_token</stringProp>
  <stringProp name="JSONPathExtractor.jsonPathExprs">$.data.token</stringProp>
  <stringProp name="JSONPathExtractor.defaultValues">TOKEN_NOT_FOUND</stringProp>
  <stringProp name="JSONPathExtractor.match_no">0</stringProp>
</JSONPathExtractor>
```

## Response Assertion — status code

```xml
<ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="Assert Status 200" enabled="true">
  <collectionProp name="Asserion.test_strings">
    <stringProp>200</stringProp>
  </collectionProp>
  <stringProp name="Assertion.test_field">Assertion.response_code</stringProp>
  <boolProp name="Assertion.assume_success">false</boolProp>
  <intProp name="Assertion.test_type">8</intProp>
</ResponseAssertion>
```

## Duration Assertion

```xml
<DurationAssertion guiclass="DurationAssertionGui" testclass="DurationAssertion" testname="Assert Duration under 2000ms" enabled="true">
  <stringProp name="DurationAssertion.duration">2000</stringProp>
</DurationAssertion>
```

## Gaussian Timer (think time)

```xml
<GaussianRandomTimer guiclass="GaussianRandomTimerGui" testclass="GaussianRandomTimer" testname="Think Time" enabled="true">
  <stringProp name="ConstantTimer.delay">1000</stringProp>
  <stringProp name="RandomTimer.range">300.0</stringProp>
</GaussianRandomTimer>
```

## HTTP Header Manager (authorization)

```xml
<HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="Request Headers" enabled="true">
  <collectionProp name="HeaderManager.headers">
    <elementProp name="" elementType="Header">
      <stringProp name="Header.name">Content-Type</stringProp>
      <stringProp name="Header.value">application/json</stringProp>
    </elementProp>
    <elementProp name="" elementType="Header">
      <stringProp name="Header.name">Authorization</stringProp>
      <stringProp name="Header.value">Bearer ${access_token}</stringProp>
    </elementProp>
  </collectionProp>
</HeaderManager>
```

## Listeners

### View Results Tree (for Load test)

```xml
<ResultCollector guiclass="ViewResultsFullVisualizer" testclass="ResultCollector" testname="View Results Tree" enabled="true">
  <boolProp name="ResultCollector.error_logging">false</boolProp>
  <objProp>
    <name>saveConfig</name>
    <value class="SampleSaveConfiguration">
      <time>true</time>
      <latency>true</latency>
      <timestamp>true</timestamp>
      <success>true</success>
      <label>true</label>
      <code>true</code>
      <message>true</message>
      <threadName>true</threadName>
      <dataType>true</dataType>
      <encoding>false</encoding>
      <assertions>true</assertions>
      <subresults>true</subresults>
      <responseData>false</responseData>
      <samplerData>false</samplerData>
      <xml>false</xml>
      <fieldNames>true</fieldNames>
      <responseHeaders>false</responseHeaders>
      <requestHeaders>false</requestHeaders>
      <responseDataOnError>false</responseDataOnError>
      <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
      <bytes>true</bytes>
      <idleTime>true</idleTime>
      <connectTime>true</connectTime>
    </value>
  </objProp>
  <stringProp name="filename">results/load.jtl</stringProp>
</ResultCollector>
```

### Aggregate Report (for Stress test)

```xml
<ResultCollector guiclass="StatVisualizer" testclass="ResultCollector" testname="Aggregate Report" enabled="true">
  <boolProp name="ResultCollector.error_logging">false</boolProp>
  <objProp>
    <name>saveConfig</name>
    <value class="SampleSaveConfiguration">
      <time>true</time>
      <latency>true</latency>
      <timestamp>true</timestamp>
      <success>true</success>
      <label>true</label>
      <code>true</code>
    </value>
  </objProp>
  <stringProp name="filename">results/stress.jtl</stringProp>
</ResultCollector>
```

### Summary Report (for Spike test)

```xml
<ResultCollector guiclass="SummariserGui" testclass="ResultCollector" testname="Summary Report" enabled="true">
  <boolProp name="ResultCollector.error_logging">false</boolProp>
  <stringProp name="filename">results/spike.jtl</stringProp>
</ResultCollector>
```
