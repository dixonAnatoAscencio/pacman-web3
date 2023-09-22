import styled, {css, keyframes} from "styled-components";

const Left = keyframes `
  0% {
    object-position: -457px -17px;
}
  25% {
    object-position: -473px -17px;
}
  50% {
    object-position: -489px -1px;
}
  100% {
    object-position: -473px -17px;
}
`
const Right = keyframes `
  0% {
    object-position: -457px -1px;
}
  25% {
    object-position: -473px -1px;
}
  50% {
    object-position: -489px -1px;
}
  100% {
    object-position: -473px -1px;
}
`
const Up = keyframes `
  0% {
    object-position: -457px -33px;
}
  25% {
    object-position: -473px -33px;
}
  50% {
    object-position: -489px -1px;
}
  100% {
    object-position: -473px -33px;
}
`
const Down = keyframes `
  0% {
    object-position: -457px -49px;
}
  25% {
    object-position: -473px -49px;
}
  50% {
    object-position: -489px -1px;
}
  100% {
    object-position: -473px -49px;
}
`


function getAnimation(direction) {
  switch (direction) {
    case "Left":
      return Left
    case "Right":
      return Right
    case "Up":
      return Up
    case "Down":
      return Down
  }
}

export const PacMan = styled.img`
    width:14px;
    height: 14px;
    object-fit: none;
    object-position: -489px -1px ;
    animation: 0.15s ${({direction}) => getAnimation(direction)} steps(1) infinite;
`



