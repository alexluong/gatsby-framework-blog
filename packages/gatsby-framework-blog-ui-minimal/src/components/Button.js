import styled from "styled-components"
import { space, layout, typography, color, buttonStyle } from "styled-system"

const Button = styled.button`
  ${space};
  ${layout};
  ${typography};
  ${color};
  ${buttonStyle};

  svg {
    width: 20px;
    height: 20px;
    margin-right: 0.75rem;
    fill: ${props => props.theme.colors.white};
  }
`

export default Button
