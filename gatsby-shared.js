import React from 'react'
import { Script } from 'gatsby'

const wrapPageElement = ({ element }) => {
  return (
    <>
      {element}

      <Script>
        {`
          (function (d, w, s) {
            var widgetHash = '31u86oxavevvl478yngs',
                gcw = d.createElement(s);
            gcw.type = 'text/javascript';
            gcw.async = true;
            gcw.src = '//widgets.binotel.com/getcall/widgets/' + widgetHash + '.js';
            var sn = d.getElementsByTagName(s)[0];
            sn.parentNode.insertBefore(gcw, sn);
          })(document, window, 'script');
        `}
      </Script>

      <Script>
        {`
          (function(d, w, s) {
            var widgetHash = 'zpgbdw1s5gao7e6ez9hr',
                ctw = d.createElement(s);
            ctw.type = 'text/javascript';
            ctw.async = true;
            ctw.src = '//widgets.binotel.com/calltracking/widgets/' + widgetHash +'.js';
                var sn = d.getElementsByTagName(s)[0]; sn.parentNode.insertBefore(ctw, sn);
          })(document, window, 'script');
        `}
      </Script>
    </>
  )
}

export default wrapPageElement
