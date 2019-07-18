import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed, 
        figure, figcaption, footer, header, hgroup, 
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
        }
        /* HTML5 display-role reset for older browsers */
        article, aside, details, figcaption, figure, 
        footer, header, hgroup, menu, nav, section {
          display: block;
        }
        body {
          line-height: 1;
        }
        ol, ul {
          list-style: none;
        }
        blockquote, q {
          quotes: none;
        }
        blockquote:before, blockquote:after,
        q:before, q:after {
          content: '';
          content: none;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }

        /* 阿里图标代码 */
        @font-face {
          font-family: 'iconfont';  /* project id 1199473 */
          src: url('//at.alicdn.com/t/font_1199473_mspb6r7yia.eot');
          src: url('//at.alicdn.com/t/font_1199473_mspb6r7yia.eot?#iefix') format('embedded-opentype'),
          url('//at.alicdn.com/t/font_1199473_mspb6r7yia.woff2') format('woff2'),
          url('//at.alicdn.com/t/font_1199473_mspb6r7yia.woff') format('woff'),
          url('//at.alicdn.com/t/font_1199473_mspb6r7yia.ttf') format('truetype'),
          url('//at.alicdn.com/t/font_1199473_mspb6r7yia.svg#iconfont') format('svg');
        }
        .iconfont {
          font-family: "iconfont" !important;
          font-size: 16px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
`