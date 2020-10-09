
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://www.myh.se/Sok/?q=".$_GET["q"]."&p=".$_GET["p"],
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Cookie: ASP.NET_SessionId=1jbkqm1cd5b3hseyhgtrvsl2; TS01c19746=014d21d2d8d749b62f11985be7c48135dd08403f6c26b7f458222d134ea5b54af07b758cf04b6e3c02d84677e43348630ca9f4b563b49093d283f58549d158159467180cde"
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
