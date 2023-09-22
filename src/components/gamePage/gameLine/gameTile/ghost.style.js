import styled, {css, keyframes} from "styled-components";

const RedLeft = keyframes`
     0%{
        object-position: -489px -65px;
    }
     50%{
        object-position: -505px -65px;
    }
`

const PinkLeft = keyframes`
     0%{
        object-position: -489px -81px;
    }
     50%{
        object-position: -505px -81px;
    }
`

const BlueLeft = keyframes`
     0%{
        object-position: -489px -97px;
    }
     50%{
        object-position: -505px -97px;
    }
`

const OrangeLeft = keyframes`
     0%{
        object-position: -489px -113px;
    }
     50%{
        object-position: -505px -113px;
    }
`

const RedRight = keyframes`
     0%{
        object-position: -457px -65px;
    }
     50%{
        object-position: -473px -65px;
    }
`
const PinkRight = keyframes`
     0%{
        object-position: -457px -81px;
    }
     50%{
        object-position: -473px -81px;
    }
`
const BlueRight = keyframes`
     0%{
        object-position: -457px -97px;
    }
     50%{
        object-position: -473px -97px;
    }
`

const OrangeRight = keyframes`
     0%{
        object-position: -457px -113px;
    }
     50%{
        object-position: -473px -113px;
    }
`

const RedUp = keyframes`
     0%{
        object-position: -521px -65px;
    }
     50%{
        object-position: -537px -65px;
    }
`

const PinkUp = keyframes`
     0%{
        object-position: -521px -81px;
    }
     50%{
        object-position: -537px -81px;
    }
`

const BlueUp = keyframes`
     0%{
        object-position: -521px -97px;
    }
     50%{
        object-position: -537px -97px;
    }
`

const OrangeUp = keyframes`
     0%{
        object-position: -521px -113px;
    }
     50%{
        object-position: -537px -113px;
    }
`

const RedDown = keyframes`
     0%{
        object-position: -553px -65px;
    }
     50%{
        object-position: -569px -65px;
    }
`

const PinkDown = keyframes`
     0%{
        object-position: -553px -81px;
    }
     50%{
        object-position: -569px -81px;
    }
`

const BlueDown = keyframes`
     0%{
        object-position: -553px -97px;
    }
     50%{
        object-position: -569px -97px;
    }
`

const OrangeDown = keyframes`
     0%{
        object-position: -553px -113px;
    }
     50%{
        object-position: -569px -113px;
    }
`


function getAnimation(type, animation) {
 switch (type) {
    case "RED":
      return redAnimation(animation)
     case "PINK":
       return pinkAnimation(animation)
    case "BLUE":
      return blueAnimation(animation)
    case "ORANGE":
      return orangeAnimation(animation)
   }
 }

 function redAnimation(animation) {
  switch (animation) {
    case 'Left':
      return RedLeft
    case 'Right':
      return RedRight
    case 'Up':
      return RedUp
    case 'Down':
      return RedDown
  }
 }
 function pinkAnimation(animation) {
   switch (animation) {
     case 'Left':
       return PinkLeft
     case 'Right':
       return PinkRight
     case 'Up':
       return PinkUp
     case 'Down':
       return PinkDown
   }
 }

 function blueAnimation(animation) {
   switch (animation) {
     case 'Left':
       return BlueLeft
     case 'Right':
       return BlueRight
     case 'Up':
       return BlueUp
     case 'Down':
       return BlueDown
   }
 }

 function orangeAnimation(animation) {
   switch (animation) {
     case 'Left':
       return OrangeLeft
     case 'Right':
       return OrangeRight
     case 'Up':
       return OrangeUp
     case 'Down':
       return OrangeDown
   }
 }

export const Ghost = styled.img`
    width: 14px;
    height: 14px;
    object-fit: none;
    object-position: -457px -65px;
    animation: 0.3s ${({type, animation}) => getAnimation(type, animation)} steps(1) infinite;
`