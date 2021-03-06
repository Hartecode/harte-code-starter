import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import Layout from './Layout'

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider resetCSS theme={theme}>
    <DefaultSeo {...pageProps?.config?.defaultSeo} />
    <Layout headerData={pageProps?.config}>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
)

export default App