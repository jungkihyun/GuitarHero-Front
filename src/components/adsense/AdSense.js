import React, { useEffect } from 'react';

const AdSense = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: "block" }}
         data-ad-client="ca-pub-6693980774596059"
         data-ad-slot="8873087119"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  );
};

export default AdSense;
