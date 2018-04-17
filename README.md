# React Native Phone Input
Phone input box for React Native

|![2560-02-08 01_10_22](https://cloud.githubusercontent.com/assets/21040043/22705440/0cc61896-ed9e-11e6-83d6-e4d98cf5c06f.gif)|![2560-02-08 01_46_21](https://cloud.githubusercontent.com/assets/21040043/22706060/73b04994-eda0-11e6-8e86-3ae1a94d9bd3.gif)|
|---------------|



## Installation
```
npm i imchintan/react-native-phone-input --save
```

## Basic Usage
```jsx
import PhoneInput from 'react-native-phone-input'

render(){
    return(
        <PhoneInput ref='phone'/>
    )
}
```

## Custom Countries
```jsx
<PhoneInput
  countriesList={require('./countries.json')}
/>
```

## Configuration
### Properties:
| Property Name | Type | Default | Description |
|---------------|----------|-------------|----------------------------------------------------------------|
| initialCountry | string | 'us' | initial selected country |
| allowZeroAfterCountryCode | bool | true | allow user input 0 after country code |
| disabled | bool | false | if true, disable all interaction of this component |
| value | string | null | initial phone number |
| style | object | null | custom styles to be applied if supplied |
| flagStyle | object | null | custom styles for flag image eg. {{width: 50, height: 30, borderWidth:0}} |
| textStyle | object | null | custom styles for phone number text input eg. {{fontSize: 14}} |
| textProps | object | null | properties for phone number text input eg. {{placeholder: 'Telephone number'}} |
| textComponent | function | TextField | the input component to use |
| offset | int | 10 | distance between flag and phone number |
| cancelText | string | 'Cancel' | cancel word |
| confirmText | string | 'Confirm' | confirm word |
| onChangePhoneNumber | function(number) | null | function to be invoked when phone number is changed |
| onSelectCountry | function(iso2) | null | function to be invoked when country picker is selected |
| onPressFlag | function() | null | function to be invoked when press on flag image |
| countriesList | array | null | custom countries list |


### Functions:
| Function Name | Return Type | Parameters | Description |
|---------------|----------|-------------|----------------------------------------------------------------|
| isValidNumber | boolean | none | return true if current phone number is valid |
| getNumberType | string | none | return true type of current phone number |
| getValue | string | none | return current phone number |
| getFlag | object | iso2:string | return flag image |
| getAllCountries | object | none | return country object in country picker |
| getPickerData | object | nont | return country object with flag image |
| focus | void | none | focus the phone input |
| selectCountry | void | iso2:string | set phone input to specific country |
| getCountryCode | string | none | return country dial code of current phone number |
| getISOCode | string | none | return country iso code of current phone number |
