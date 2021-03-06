import { Container, Box, useTheme } from "@chakra-ui/react"
import CtaList, { CTABtn, BtnColor, BtnVariant } from './CtaList'
import { AlignItemsOptions } from '../interface/enums'
import styled from 'styled-components'

export interface TextBlockProps {
  richText: string;
  cta: CTABtn[];
  textPos: AlignItemsOptions;
  groupPosition: AlignItemsOptions;
  colorScheme: BtnColor;
  variant: BtnVariant;
  position?: number;
}

export const ContentContainer = styled(Box)`
  h1, h2, h3 {
    font-weight: ${({ fontweights }) => fontweights.bold};
  }

  h1 {
    font-size: ${({ fontsizes }) => fontsizes['5xl']};
  }

  h2 {
    font-size: ${({ fontsizes }) => fontsizes['4xl']};
  }

  h3 {
    font-size: ${({ fontsizes }) => fontsizes['3xl']};
  }

  p {
    min-height: ${({ space }) => space['6']};
  }

  ol,
  ul {
    margin-left: ${({ space }) => space['7']};
  }

  a {
    color: ${({ colors }) => colors.blue[500]};
    position: relative;
    transition: all 0.25s;

    &::after {
      border-bottom: ${({ space }) => space.px} solid ${({ colors }) => colors.blue[700]};
      bottom: 0;
      content: '';
      height: 0;
      left: 0;
      position: absolute;
      transition: all 0.25s;
      width: 0;
    }

    &:hover {
      color: ${({ colors }) => colors.blue[700]};

      &::after {
        content: '';
        width: 100%;
      }
    }
  }
`

function createMarkup(richText: string) {
  return {__html: richText};
}

const TextBlock = ({ richText, textPos, ...ctaListProps }: TextBlockProps)=> {
  const theme = useTheme()
  return (
    <Container maxW="container.md" textAlign={textPos} centerContent>
        <ContentContainer dangerouslySetInnerHTML={createMarkup(richText)}
          colors={theme.colors}
          fontweights={theme.fontWeights}
          space={theme.space}
          fontsizes={theme.fontSizes} />
        <CtaList size="md" {...ctaListProps} />
    </Container>
  )
}

export default TextBlock