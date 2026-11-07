import { HeaderMetaInfoProvider } from './HeaderMetaInfoProvider'
import { PageScrollInfoProvider } from './PageScrollInfoProvider'
import { ThemeProvider } from './ThemeProvider'

export function Provider(props: {
  pathName: string
  title?: string
  description?: string
  slug?: string
}) {
  return (
    <>
      <HeaderMetaInfoProvider {...props} />
      <PageScrollInfoProvider />
      <ThemeProvider />
    </>
  )
}
