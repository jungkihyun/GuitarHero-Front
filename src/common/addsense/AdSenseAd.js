import { useEffect } from 'react';

const AdSenseAd = () => {
  useEffect(() => {
    // AdSense 스크립트를 로드하여 광고를 실행합니다.
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense 광고 로드 실패:', e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-3620578313764882"
        data-ad-slot="1268672682"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    // <ins
    //   className="adsbygoogle"
    //   style={{ display: 'block', textAlign: 'center' }}
    //   data-ad-client="ca-pub-XXXXXXXXXXXXXX"  // 여기에 자신의 AdSense client ID를 입력
    //   data-ad-slot="XXXXXXXXXX"               // 여기에 생성한 광고 단위 slot ID를 입력
    //   data-ad-format="auto"
    //   data-full-width-responsive="true"
    // ></ins>
  );
};

export default AdSenseAd;