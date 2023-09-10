import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import Document, { DocumentContext, Head, Html, Main, NextScript, } from 'next/document';
import Logo from '../components/logo';

const Placeholder = () => {
    return <>
        <style dangerouslySetInnerHTML={{
            __html: `body { display: block; }
        #App-Loader {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 99999999;
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        #App-Loader-Content {
            display: flex;
        }

          .App-Loading {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .App-Loading-Circular {
            animation: rotate 1.5s linear infinite;
            height: 100px;
            position: relative;
            width: 100px;
          }
          
          .App-Loading-Circular-Path {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
            animation: dash 1s ease-in-out infinite;
            stroke-linecap: round;
            stroke: black;
          }
          
          @media (prefers-color-scheme: dark) {
            .App-Loading-Circular-Path {
                stroke: white;
            }

            #App-Loader {
                background: black;
            }

            #App-Loader-Content {
                color: white;
            }
          }

          @keyframes rotate {
            100% {
              transform: rotate(360deg);
            }
          }
          
          @keyframes dash {
            0% {
              stroke-dasharray: 1, 200;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 89, 200;
              stroke-dashoffset: -35;
            }
            100% {
              stroke-dasharray: 89, 200;
              stroke-dashoffset: -124;
            }
          }
          
        ` }} />
        <div id="App-Loader">
            <div id="App-Loader-Content">
                <Logo color="currentColor" style={{ transform: "scale(5)" }} />

                <div className="App-Loading">
                    <svg className="App-Loading-Circular">
                        <circle className="App-Loading-Circular-Path" cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit="10" />
                    </svg>
                </div>
            </div>
        </div>
        <script dangerouslySetInnerHTML={{
            __html: `window._HANDLER_STARTUP_FINISHED_=function(){window["App-Loader"].remove();window._HANDLER_STARTUP_FINISHED_=function(){}}`
        }} /></>
};

export default class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const cache = createCache();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: App => props =>
                (
                    <StyleProvider cache={cache} hashPriority="high">
                        <App {...props} />
                    </StyleProvider>
                ),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <style
                        data-test="extract"
                        dangerouslySetInnerHTML={{ __html: extractStyle(cache) }}
                    />
                </>
            ),
        };
    }

    render() {
        return (
            <Html>
                <Head>
                    <Placeholder />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
