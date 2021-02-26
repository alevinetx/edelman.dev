import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="webmention" href="https://webmention.io/edelman.dev/webmention" />
                    <link rel="pingback" href="https://webmention.io/edelman.dev/xmlrpc" />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}