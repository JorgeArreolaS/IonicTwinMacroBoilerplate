import { Templates } from "./RouterTemplates"

type PageTemplates = keyof typeof Templates
type TemplateOptions<T extends PageTemplates> = Parameters<(typeof Templates)[T]>[0]
// type TemplateParams<T extends PageTemplates> = Parameters<(typeof Templates)[T]>[1]

type ValuesOf<T> = T[keyof T]
type ASD = ValuesOf<{
  [Key in PageTemplates]: {
    template: Key,
    options: TemplateOptions<Key>
  }
}>

const Layout: React.FC<ASD> = ({ template = "default", children, options }) => {
  
  const Component = Templates[template] as any

  return ( <Component children={children} {...options}/> )
}

export default Layout
