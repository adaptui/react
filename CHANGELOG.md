# Changelog

All notable changes to this project will be documented in this file. See
[standard-version](https://github.com/conventional-changelog/standard-version)
for commit guidelines.

### [0.1.1-alpha.4](https://github.com/timelessco/renderless-components/compare/v0.1.1-alpha.3...v0.1.1-alpha.4) (2020-10-14)

### Features

- added DateRangePicker
  ([#91](https://github.com/timelessco/renderless-components/issues/91))
  ([0a1cabd](https://github.com/timelessco/renderless-components/commit/0a1cabdbb1a7172538ecf7853ef15d1e86b76388))
- **accordion:** ✨ improve accordion state with better aria & tests
  ([2f47dbc](https://github.com/timelessco/renderless-components/commit/2f47dbc12324ef75275da042a88515cb0064a428))
- **time-picker:** ✨ add keyboard navigation to the column
  ([0a514ad](https://github.com/timelessco/renderless-components/commit/0a514ad9f1d6cdf36d2c5fd928b7a513a20b2ca0))
- added TimePicker v1
  ([#59](https://github.com/timelessco/renderless-components/issues/59))
  ([7295695](https://github.com/timelessco/renderless-components/commit/7295695a1961f3a303c04ef9386033a5d7f35461)),
  closes [#75](https://github.com/timelessco/renderless-components/issues/75)

### Bug Fixes

- **buttons:** 🐛 remove buttons altogether
  ([3d8bdf9](https://github.com/timelessco/renderless-components/commit/3d8bdf962ef662c6bf5b0dba5c70bb50c5bd867d))
- **spin-buttons:** 🐛 add aria-buttons for spin button types
  ([9606a7d](https://github.com/timelessco/renderless-components/commit/9606a7df2bf55ef001292d54103b1e64d56e0ded))
- timepicker voiceover a11y
  ([#84](https://github.com/timelessco/renderless-components/issues/84))
  ([bf9cdc6](https://github.com/timelessco/renderless-components/commit/bf9cdc61eb6a3cae9972e190996b8d0c27b1d389))

### Build System

- added bundlesize configs
  ([#77](https://github.com/timelessco/renderless-components/issues/77))
  ([6b79e32](https://github.com/timelessco/renderless-components/commit/6b79e329621c1e3e90a104a5c9894a48485db033))

### Tests

- **pickers:** ✅ fix tests on pickers
  ([1e2ac10](https://github.com/timelessco/renderless-components/commit/1e2ac103531665323d922aab55d4f1216518e7c6))
- added test for BasePicker
  ([#83](https://github.com/timelessco/renderless-components/issues/83))
  ([02f7d87](https://github.com/timelessco/renderless-components/commit/02f7d87b2a9cf2b5c0daaae719eb80985605f6d8))
- added test for timepicker
  ([#86](https://github.com/timelessco/renderless-components/issues/86))
  ([759e100](https://github.com/timelessco/renderless-components/commit/759e1003978fb197eca6a4d69d15495b64851c71))
- added tests for calendar
  ([#73](https://github.com/timelessco/renderless-components/issues/73))
  ([3c2d16a](https://github.com/timelessco/renderless-components/commit/3c2d16a3b1776396822bd2d57e66c99bf773672e))
- added tests for segment
  ([#76](https://github.com/timelessco/renderless-components/issues/76))
  ([456ce49](https://github.com/timelessco/renderless-components/commit/456ce49b1fd3f84acfd458ba3210981d306ebfdc))
- added tests for SegmentState
  ([#79](https://github.com/timelessco/renderless-components/issues/79))
  ([55bc3c5](https://github.com/timelessco/renderless-components/commit/55bc3c58e788e248a0a5bb1e9fb8009e78b9b4fc))

### Others

- **accordion:** 💄 improve styled accordion css & markup
  ([d2c6feb](https://github.com/timelessco/renderless-components/commit/d2c6feb91e95e954c0ccb77dabeb4328f62ae678))
- rename DateFormatTime to prevent key generation
  ([#87](https://github.com/timelessco/renderless-components/issues/87))
  ([f8f72fd](https://github.com/timelessco/renderless-components/commit/f8f72fd23a0cc1293601d9326525623851ac7d49))
- **deps:** ⬆️ upgrade project & dev deps
  ([502eda3](https://github.com/timelessco/renderless-components/commit/502eda34416ca2837cfa152b9923bd7916187a88))
- **release:** 0.1.1-alpha.3
  ([70235ec](https://github.com/timelessco/renderless-components/commit/70235ec17428c7de32e7d255d47ef03f7478ccba))

### Code Refactoring

- **accordion:** ♻️ change accordion tsx to ts
  ([7a4ebf3](https://github.com/timelessco/renderless-components/commit/7a4ebf3bf49b2ab12d99e81e587876d699c238e7))
- **accordion:** ♻️ move functions to the bottom of the components
  ([d525a8f](https://github.com/timelessco/renderless-components/commit/d525a8f42f1f113cf319080c7fab85f1f7a7b8b8))
- **accordion:** ♻️ remove console logs & rename item to trigger
  ([e6a998b](https://github.com/timelessco/renderless-components/commit/e6a998b3b21fb6c900a9b4c5b24c28a0e599b705))
- **accordion:** ♻️ update initial state & tests
  ([341b5c7](https://github.com/timelessco/renderless-components/commit/341b5c74af6ac35cb1b5d8e88c3b667047f9cae8))
- **accordion:** ♻️ update keys for accordion trigger
  ([dbf7fc5](https://github.com/timelessco/renderless-components/commit/dbf7fc5ce17ad9df91dcea1e3f77104788778383))
- **aria:** ♻️ remove aria dependencies with button & interactions
  ([f32199c](https://github.com/timelessco/renderless-components/commit/f32199cbabf5ac529786896aec26e6f305480dfb))
- **pickers:** ♻️ improve state from dateValue to string
  ([ade0a4e](https://github.com/timelessco/renderless-components/commit/ade0a4ef3621828d6dfb66b57ed4ca3a391279e5))
- **pickers:** ♻️ update utils & add date utils
  ([12ee6da](https://github.com/timelessco/renderless-components/commit/12ee6da780ae2a79d7d3e3878321945f0a1a1995))
- **pickers:** ✨ utils date logic & naming
  ([8638596](https://github.com/timelessco/renderless-components/commit/86385966345120a6650c70b49363d5e7ef643f4e))
- **timepicker:** ♻️ add guard clause to createonkeydown
  ([9e46551](https://github.com/timelessco/renderless-components/commit/9e46551db31c023b7f67a19c96c2ffd0ae739931))

### [0.1.1-alpha.3](https://github.com/timelessco/renderless-components/compare/v0.1.1-alpha.2...v0.1.1-alpha.3) (2020-10-07)

### [0.1.1-alpha.2](https://github.com/timelessco/renderless-components/compare/v0.1.1-alpha.1...v0.1.1-alpha.2) (2020-10-07)

### Features

- added DatePicker
  ([#58](https://github.com/timelessco/renderless-components/issues/58))
  ([2698ddf](https://github.com/timelessco/renderless-components/commit/2698ddf68dac261b742c16c78e3e42507652619e)),
  closes [#70](https://github.com/timelessco/renderless-components/issues/70)
  [#72](https://github.com/timelessco/renderless-components/issues/72)
  [#71](https://github.com/timelessco/renderless-components/issues/71)

### Bug Fixes

- breadcrumb isCurrent disabled should be false
  ([#69](https://github.com/timelessco/renderless-components/issues/69))
  ([66fb5a1](https://github.com/timelessco/renderless-components/commit/66fb5a1b1dce28b651796f98ccc14b6126951901))

### Others

- **release:** 0.1.1-alpha.1
  ([381934e](https://github.com/timelessco/renderless-components/commit/381934e21437c945df85e9d7c3561352e1985634))

### Code Refactoring

- added custom dragging logic in toast gesture & removed react-use-gesture
  ([#67](https://github.com/timelessco/renderless-components/issues/67))
  ([6c1c0ec](https://github.com/timelessco/renderless-components/commit/6c1c0ec7290dd0ae2c5c8fe4255385a1d5594f79))
- improved drawer types & fixed drawer bugs
  ([#68](https://github.com/timelessco/renderless-components/issues/68))
  ([4dc06ef](https://github.com/timelessco/renderless-components/commit/4dc06ef0c75bbaf572dad807e6e23639b303f073))

### [0.1.1-alpha.1](https://github.com/timelessco/renderless-components/compare/v0.1.1-alpha.0...v0.1.1-alpha.1) (2020-10-01)

### Bug Fixes

- fix broken tests
  ([b60d91f](https://github.com/timelessco/renderless-components/commit/b60d91f409bb3cc8dad0f53a7f692c73c06562a0))

### Others

- use custom babel config
  ([ebcc52d](https://github.com/timelessco/renderless-components/commit/ebcc52d8a7cd32d1f67befb6d2d7094fac3c91ee))
- **release:** 0.1.1-alpha.0
  ([3d2976a](https://github.com/timelessco/renderless-components/commit/3d2976a2005ad69c79101fc13d02f2d0aa81a41c))

### Build System

- fixed broken storybook / build
  ([cda49c9](https://github.com/timelessco/renderless-components/commit/cda49c9ddff5cb953542c61a6bf3a8143d161491))
- ignore **examples** folder
  ([3f820e5](https://github.com/timelessco/renderless-components/commit/3f820e5409e954ae0a42f5d239b0bf47af71d6e8))

### Code Refactoring

- move storybook progress utils
  ([c84a846](https://github.com/timelessco/renderless-components/commit/c84a8460df24a5133ceb32afd415ce308c2887ff))

### [0.1.1-alpha.0](https://github.com/timelessco/renderless-components/compare/v0.1.0...v0.1.1-alpha.0) (2020-10-01)

### Bug Fixes

- **publish:** 🔧 bug with npm publish & add prepublish script
  ([9b2468f](https://github.com/timelessco/renderless-components/commit/9b2468f41038409f7797f91a7daaf9530f999b15))

## 0.1.0 (2020-10-01)

### Features

- **accordion:** ✨ add accordion components
  ([1b4b61e](https://github.com/timelessco/renderless-components/commit/1b4b61e072050e72a8fdfcdab7d4928f1e1a1356))
- **accordion:** ✨ update accordion to expose panel open
  ([3117edd](https://github.com/timelessco/renderless-components/commit/3117edd81bd5563c684b1630a14c8c7b75e3dc00))
- **build:** ✨ babel es & cjs build
  ([d22e80a](https://github.com/timelessco/renderless-components/commit/d22e80ac76cb6850fe1e4de81892860f7607f35b))
- **button:** ✨ add react aria buttons & interactions
  ([#9](https://github.com/timelessco/renderless-components/issues/9))
  ([b61e990](https://github.com/timelessco/renderless-components/commit/b61e99050fdc97be5baa610edecd4fe87181b941))
- **calendar:** ✨ version 1
  ([#51](https://github.com/timelessco/renderless-components/issues/51))
  ([7ec40f7](https://github.com/timelessco/renderless-components/commit/7ec40f75b1a749d40b7951263a8d35e65d43a28a)),
  closes [#52](https://github.com/timelessco/renderless-components/issues/52)
  [#54](https://github.com/timelessco/renderless-components/issues/54)
  [#55](https://github.com/timelessco/renderless-components/issues/55)
- **link:** ✨ add breadcrumbs with link
  ([f69c990](https://github.com/timelessco/renderless-components/commit/f69c9903c2217f91f4c04e9c31ac957b822f5c5f))
- **meter:** ✨ add meter components
  ([7881cb4](https://github.com/timelessco/renderless-components/commit/7881cb49bc805f2b484688f788073e2ffcf2cc38))
- **meter:** ✨ add meter functionalities
  ([89d56f8](https://github.com/timelessco/renderless-components/commit/89d56f8508bcb474bfa51ef45052527832e453a4))
- **number-input:** ✨ add numberinput component
  ([abfc8a4](https://github.com/timelessco/renderless-components/commit/abfc8a4ff3ca74f186201f303a6a4e7cd869fe12))
- **pagination:** ✨ initiate pagination
  ([36e4513](https://github.com/timelessco/renderless-components/commit/36e451329e3b5875ce9df5d71c6c32ef62204ea0))
- **progress:** ✨ add circular progress example
  ([d35e519](https://github.com/timelessco/renderless-components/commit/d35e519d2d9156df6bcef453a413ce6dd40ea93a))
- **select:** Improved Select & Combobox behaviours
  ([#10](https://github.com/timelessco/renderless-components/issues/10))
  ([9feb564](https://github.com/timelessco/renderless-components/commit/9feb5641fcd7699aa8c37bc25c370fd0e8bec109))
- **slider:** ✨ add slider component
  ([3b6e4a4](https://github.com/timelessco/renderless-components/commit/3b6e4a426defd1c026b789cf88250fca11a56728))
- **slider:** ✨ add SliderInput and refactors
  ([f295071](https://github.com/timelessco/renderless-components/commit/f295071a1af35f364c59a726295af753ddaeea30))
- **tsc:** ✨ add types build
  ([c5e3ad9](https://github.com/timelessco/renderless-components/commit/c5e3ad9e4851ca24ca47da6761c087d8ff0c730e))
- wip added range calendar
  ([440e616](https://github.com/timelessco/renderless-components/commit/440e616759c61e5ed7e8a71124fb55b52a0d741b))
- **meter:** ✅ add tests and examples
  ([e87fbac](https://github.com/timelessco/renderless-components/commit/e87fbac8beea41ca2005a07dba99155354f429d3))
- **pagination:** ✨ stablilize pagination
  ([bd60cb2](https://github.com/timelessco/renderless-components/commit/bd60cb284a217f16db422f133d01f645151874e4))
- :sparkles: update accordion with more features
  ([0f094f6](https://github.com/timelessco/renderless-components/commit/0f094f67abac92b7fbd70632841822bd37373c10))
- ✨ bootstrap initial project files
  ([d84c191](https://github.com/timelessco/renderless-components/commit/d84c19129e2c1108414560f5aff911c1aa8a7e11))
- added drawer component
  ([#20](https://github.com/timelessco/renderless-components/issues/20))
  ([f25f99c](https://github.com/timelessco/renderless-components/commit/f25f99c695b12c048ad0a70150bf021e85276889))
- added mouse wheel behaviours
  ([4b72a0d](https://github.com/timelessco/renderless-components/commit/4b72a0d57192094394067c3a6c46afdd54e81ef5))
- added toast component
  ([#17](https://github.com/timelessco/renderless-components/issues/17))
  ([1b18d05](https://github.com/timelessco/renderless-components/commit/1b18d05d52c9e1a45e5ec14696de5c330f06698f))
- **progress:** ✨ add progress components
  ([62afa46](https://github.com/timelessco/renderless-components/commit/62afa464badfe75b20b491b943988db30c8474e1))
- added select component
  ([4f74414](https://github.com/timelessco/renderless-components/commit/4f744149a1cdddf6b7f2a4b93dd35d70bd44f274))
- wip select popover
  ([d59b33c](https://github.com/timelessco/renderless-components/commit/d59b33c96539263ed67c9dd05ab199a7b2fca238))

### Bug Fixes

- getCellOptions type
  ([10d28d0](https://github.com/timelessco/renderless-components/commit/10d28d08a95b0770395cf9db562edd901f134db2))
- toast ally issue
  ([#40](https://github.com/timelessco/renderless-components/issues/40))
  ([188284f](https://github.com/timelessco/renderless-components/commit/188284f6f2ed3bf572e8c25dc152e405fbc20864))
- typo in scripts
  ([dd90db4](https://github.com/timelessco/renderless-components/commit/dd90db49a33a6acf3432f70c457ca3c7d14c3d1f))
- **accordion:** 🐛 add keys and make default loop true
  ([39c7c57](https://github.com/timelessco/renderless-components/commit/39c7c57c94ca5353a5e73d5f55e84c0276e1d9df))
- **number-input:** 🐛 bug with mouse spin
  ([ec58392](https://github.com/timelessco/renderless-components/commit/ec58392d374cda7148076d40d651a2a5df5ab6b7))
- **pagination:** 🐛 fix pagination keys name
  ([48bb0d2](https://github.com/timelessco/renderless-components/commit/48bb0d2ab9a2542efa524ed8c7040d0a04314f1b))
- **select:** reduce typeahead delay & focus selection bug
  ([#8](https://github.com/timelessco/renderless-components/issues/8))
  ([676c3e2](https://github.com/timelessco/renderless-components/commit/676c3e2229d549334f5e95a1cc2ec3eb5f970fb9))
- conflict
  ([020129b](https://github.com/timelessco/renderless-components/commit/020129bb957fe1cecef459fcd9a7de076c16d277))
- **slider:** ✏️ fix focus on Slider and stories
  ([841a63e](https://github.com/timelessco/renderless-components/commit/841a63eb2d65c87148aafe4295e22bb10dc968e0))

### Performance Improvements

- prevent 2d array generation on each render
  ([44498c6](https://github.com/timelessco/renderless-components/commit/44498c61a1e87d35ec38287823d1c47a3494eb90))

### Docs

- **meter:** 💡 add reference to html spec
  ([1076f92](https://github.com/timelessco/renderless-components/commit/1076f9241ae4dd2bccff63d16c91f62cc11a2003))
- **readme:** 📝 update readme
  ([6dac325](https://github.com/timelessco/renderless-components/commit/6dac325a6e9783c2bca9f1531c6fd385a814927f))

### Tests

- added tests for accordion
  ([#22](https://github.com/timelessco/renderless-components/issues/22))
  ([dac7a73](https://github.com/timelessco/renderless-components/commit/dac7a73f800ca25546cc42672573973c2ea176cb))
- added tests for breadcrumb
  ([#36](https://github.com/timelessco/renderless-components/issues/36))
  ([4eb5e3a](https://github.com/timelessco/renderless-components/commit/4eb5e3a9571dd838c185df185b37b64b4f42694a))
- added tests for link
  ([#33](https://github.com/timelessco/renderless-components/issues/33))
  ([9785c77](https://github.com/timelessco/renderless-components/commit/9785c7791a651a97a95e186c4dc5362d1505bc03))
- added tests for number input
  ([#26](https://github.com/timelessco/renderless-components/issues/26))
  ([3f099a3](https://github.com/timelessco/renderless-components/commit/3f099a38d5dce6aa95b769d20134d7cd82a0e940))
- added tests for pagination
  ([#37](https://github.com/timelessco/renderless-components/issues/37))
  ([3355e47](https://github.com/timelessco/renderless-components/commit/3355e47d0ba7c676644317d508aa28f9afa278e7))
- added tests for progress
  ([#31](https://github.com/timelessco/renderless-components/issues/31))
  ([02415bf](https://github.com/timelessco/renderless-components/commit/02415bfab2f777c8b0f83b78f4aec72e411e9efc))
- added tests for Slider
  ([#27](https://github.com/timelessco/renderless-components/issues/27))
  ([08a1064](https://github.com/timelessco/renderless-components/commit/08a1064c4f93858eedb36dc0d84df16e4db15ad7))
- added tests for toast
  ([#38](https://github.com/timelessco/renderless-components/issues/38))
  ([57ba567](https://github.com/timelessco/renderless-components/commit/57ba567a690c43d739c6c88ab4cb473b039613d5))
- improved toast tests
  ([#41](https://github.com/timelessco/renderless-components/issues/41))
  ([2e6fc86](https://github.com/timelessco/renderless-components/commit/2e6fc86d12c1edd8846dc34a7984033188563cf2))
- refactored imports & fixed pagination component
  ([#42](https://github.com/timelessco/renderless-components/issues/42))
  ([57dbe85](https://github.com/timelessco/renderless-components/commit/57dbe850706e918b342b8e32da2357bc4839133d))

### Styling

- added better styling to emphasize start and end point
  ([c7d4bb3](https://github.com/timelessco/renderless-components/commit/c7d4bb35cf0b2b585273f7560777965034ca806c))

### Code Refactoring

- **calendar:** ♻️ rename calendar-v1 to calendar
  ([df132c2](https://github.com/timelessco/renderless-components/commit/df132c25dbca326b6cc31550d54fa1fe5a8e1b62))
- **range-calendar:** ♻️ review changes and fix bugs with space
  ([#61](https://github.com/timelessco/renderless-components/issues/61))
  ([2b7c5f6](https://github.com/timelessco/renderless-components/commit/2b7c5f63e674bf3a8673e3a871e8a41464bd5e72))
- improved types & fixed bugs
  ([2a7ef74](https://github.com/timelessco/renderless-components/commit/2a7ef74bf08d99efca6acff45f41bd1d7a35970d))
- removed weekIndex dayIndex props from cell
  ([2df03fa](https://github.com/timelessco/renderless-components/commit/2df03fa2de0400cc139aee3562e8b2348a4131e9))
- sorted imports
  ([#56](https://github.com/timelessco/renderless-components/issues/56))
  ([85caa5f](https://github.com/timelessco/renderless-components/commit/85caa5fd21db4b5392ffe42d952ddf516c2f4c49))
- use createOnKeyDown
  ([c20205f](https://github.com/timelessco/renderless-components/commit/c20205f2faf48941f9d3146c5930bf5514219cc1))
- **accordion:** ♻️ accordion state actions
  ([414991d](https://github.com/timelessco/renderless-components/commit/414991d2f52d3aaba1415753b5f80d1e39648fbc))
- **accordion:** ♻️ add helper for reducer
  ([04c5d16](https://github.com/timelessco/renderless-components/commit/04c5d16bb0e7e5045ff1f3a7d6bec034a228aca6))
- **accordion:** ♻️ change css classname lettercase
  ([8b65c23](https://github.com/timelessco/renderless-components/commit/8b65c23a41e961de23be91bdc5cdac3b0d1d1cb9))
- **accordion:** ♻️ remove effect for defaultActiveId
  ([41597be](https://github.com/timelessco/renderless-components/commit/41597be280c9e906ddcd3305335d093ef0e0c2b5))
- **accordion:** ♻️ restructure source code
  ([d04eae9](https://github.com/timelessco/renderless-components/commit/d04eae97526ae8c793a868b45c2be687f8e00c3c))
- **accordion:** ♻️ type accordion better
  ([109e90a](https://github.com/timelessco/renderless-components/commit/109e90a5166641130aa3b88fe6c36205486aeee7))
- **accordion:** ♻️ update keys and imports
  ([3bf0079](https://github.com/timelessco/renderless-components/commit/3bf0079efd9105683f5213590ff6d864a5c4ccbb))
- **accordion:** 🎨 improve types and remove unused code
  ([d49ca09](https://github.com/timelessco/renderless-components/commit/d49ca0956da52935a3e94a6e3e5e194c7a5b5ef0))
- **breadcrumb:** ♻️ arrange imports and refactor
  ([7e07ce8](https://github.com/timelessco/renderless-components/commit/7e07ce8d7dc4ce645e8d35a5a800796391775d23))
- **breadcrumb:** ♻️ isExternal variable
  ([3eaf984](https://github.com/timelessco/renderless-components/commit/3eaf984bd119925c809302ad797650f063c7dbd0))
- **deps:** ⬆️ upgrade chakra deps
  ([1d742d6](https://github.com/timelessco/renderless-components/commit/1d742d6789adae91f4aff5bc9006797e2e507e74))
- **imports:** ♻️ organize imports on all components
  ([251bb1b](https://github.com/timelessco/renderless-components/commit/251bb1b936cf2d4ff36c8191c98fda7118da451e))
- **meter:** ✅ change hooks test to match objects
  ([5bc0c66](https://github.com/timelessco/renderless-components/commit/5bc0c667047d963c286f4a72e3c3491441464f90))
- **meter:** 📝 add more examples with refactor
  ([aa64c42](https://github.com/timelessco/renderless-components/commit/aa64c42c6f39d33898d5c7f68723fa8a2fd9244c))
- **number-input:** ♻️ spin button hook
  ([e787212](https://github.com/timelessco/renderless-components/commit/e78721226cc76155e1f4c02f7f5be81a2386b5e2))
- **pagination:** ♻️ add addition checks on button handler
  ([30d896d](https://github.com/timelessco/renderless-components/commit/30d896d98274561979c9cc46d3cb6396e1172739))
- **pagination:** ♻️ move utils to bottom
  ([87a9b1b](https://github.com/timelessco/renderless-components/commit/87a9b1b9f3443699907f64001f8349cd809c65de))
- **pagination:** ♻️ rename goTo to move for future changes
  ([0982f54](https://github.com/timelessco/renderless-components/commit/0982f5408a6a06649cabc239dbcd9677e74e781a))
- **pagination:** ♻️ restore default
  ([4ba0c6d](https://github.com/timelessco/renderless-components/commit/4ba0c6d8bbb0b21dafee0631ab2f8b7d710bb1ba))
- **pagination:** 👌 review changes done
  ([9f04462](https://github.com/timelessco/renderless-components/commit/9f04462cde3a5d95518b9b6e6eafdce0f7962478))
- **pagination:** 🚸 unify pagination navigation
  ([edfa252](https://github.com/timelessco/renderless-components/commit/edfa2529060f67de163e734cfbb7ae8880e71374))
- **progress:** 🏷️ progress options type
  ([fada96a](https://github.com/timelessco/renderless-components/commit/fada96a4b67bf094826ad8add9096d5bc1034c0c))
- **slider:** 🎨 improve types for all slide comps
  ([fae66c2](https://github.com/timelessco/renderless-components/commit/fae66c26a7d472b356cfb46cf596f429c8ea5fdc))
- **slider:** 🏷️ update types with Pick
  ([c5bfd72](https://github.com/timelessco/renderless-components/commit/c5bfd72c8f4270a76c499d46b0bf18a1775101f5))
- **slider:** 💡 add attribution to chakra on all slider components
  ([8f9e716](https://github.com/timelessco/renderless-components/commit/8f9e7161dc97cdb89430d9f3ceeaef1ae6496f76))
- **types:** 🏷️ update types and refactor
  ([48a5912](https://github.com/timelessco/renderless-components/commit/48a5912c81eedf8d49c3baf485693fa2049c82ee))
- **utils:** ♻️ organize util imports
  ([4e69f3e](https://github.com/timelessco/renderless-components/commit/4e69f3e767054b00f307d797887a2161c3c53afc))
- ♻️ turn ts config strict false
  ([3e02c54](https://github.com/timelessco/renderless-components/commit/3e02c54cbee6e8383eca45c44f261aaf674df321))
- 👷 add netlify build
  ([8040d66](https://github.com/timelessco/renderless-components/commit/8040d66bf00b714ec61416ebd648f66ed89d81ab))
- refactored NumberInput Button logics
  ([b43074e](https://github.com/timelessco/renderless-components/commit/b43074ee746241286545f77ea510e20787f24333))
- removed duplicate storybook code
  ([#29](https://github.com/timelessco/renderless-components/issues/29))
  ([88175da](https://github.com/timelessco/renderless-components/commit/88175dafdcdbc0bbf6c0b355b681aa02b112cec6))

### Others

- **build:** ✏️ add babel runtime back
  ([72f83c2](https://github.com/timelessco/renderless-components/commit/72f83c2be68d0e28ba8fe4f2613b5ac3e41b8a22))
- fix ci, update snapshots
  ([39a44e1](https://github.com/timelessco/renderless-components/commit/39a44e1a81a9770193765300644505af27d1768d))
- **deps:** ⬆️ update multiple deps to latest
  ([0011bd7](https://github.com/timelessco/renderless-components/commit/0011bd7b2bd2d2504c62e7bbe17970a8046fe128))
- **deps:** ⬆️ update project & dev deps
  ([#60](https://github.com/timelessco/renderless-components/issues/60))
  ([05dab57](https://github.com/timelessco/renderless-components/commit/05dab57b4f4692ab4d80c777c45c768d491b9509))
- **deps:** updated reakit
  ([726d957](https://github.com/timelessco/renderless-components/commit/726d957ff88e0d370cf755416add11a2fe8fe1d1))
- 🎨 update imports
  ([f714398](https://github.com/timelessco/renderless-components/commit/f714398175ca7da5a00defebf137b0711a4caf1c))
- added more examples
  ([bc4d6c1](https://github.com/timelessco/renderless-components/commit/bc4d6c1b489245aafd87773840f7a1de5515f2df))
- added react-hook-form examples
  ([#35](https://github.com/timelessco/renderless-components/issues/35))
  ([b0d89db](https://github.com/timelessco/renderless-components/commit/b0d89dbd0b5164cd8a8636f78494b4a2eae6450e))
- remove unneeded babel plugins
  ([7f498d6](https://github.com/timelessco/renderless-components/commit/7f498d67b5ffd2c6f91dbcdc2fcd9cb21c248c7c))
- **deps:** ➕ add missed test library
  ([e0bc1d7](https://github.com/timelessco/renderless-components/commit/e0bc1d7937860accc2d21c361dcd17ca26c5df2f))
- **deps:** ⬆️ udpate eslint and remove unused deps
  ([58b922d](https://github.com/timelessco/renderless-components/commit/58b922dbbff0a6ba95f33edc588dd4b113da80b8))
- **deps:** ⬆️ upgrade reakit and ignore yark.lock
  ([56d91c7](https://github.com/timelessco/renderless-components/commit/56d91c778534647738aa2ea0c34b84fe69e070e0))
- **meter:** ✏️ remove export on MeterComp
  ([3567b7b](https://github.com/timelessco/renderless-components/commit/3567b7bb48127ef7db3de683c47df8eda0de3a0a))
- **meter:** ⬆️ upgrade husky
  ([4826556](https://github.com/timelessco/renderless-components/commit/48265562695dca28cd20228716a8841fd1b9df8a))
- **meter-test:** ✅ improve test with jest-in-case
  ([826ec63](https://github.com/timelessco/renderless-components/commit/826ec634de4b657b9fdbf2e96a85f789a213db1f))
- **number-input:** 🚸 add more storybook examples
  ([62bf811](https://github.com/timelessco/renderless-components/commit/62bf8112e2c140ca7dc0211ee81997c62906fd4c))
- **progress:** 💡 give credits to the chakra for the logic
  ([7300b89](https://github.com/timelessco/renderless-components/commit/7300b8961b24079332fa4081f1f16365ec9b338f))
- **slider:** 🎨 change types names
  ([e856e63](https://github.com/timelessco/renderless-components/commit/e856e637e0bd94918530942d99d3aa6400d5544e))
- **vscode:** 🔧 add vscode extension recommendations
  ([46afdb1](https://github.com/timelessco/renderless-components/commit/46afdb113f106c6726167345d94c95c5af16785d))
- codebase cleanup
  ([09c3426](https://github.com/timelessco/renderless-components/commit/09c3426b74506be185a81ebafc45881125604563))
- regorganize folder
  ([58f62f3](https://github.com/timelessco/renderless-components/commit/58f62f38f9f8a950a80ca34445cd52c5aaa4dee1))
- remove husky precommit test
  ([bd177b9](https://github.com/timelessco/renderless-components/commit/bd177b984b540563f63b2c6bf22fe31adbacad68))
- **number-input:** 💡 add credits to Chakra UI
  ([a5c46b7](https://github.com/timelessco/renderless-components/commit/a5c46b7247d4b673e151df64003a61c2feacd861))
- **pagination:** 🏷️ update types
  ([4bfbb21](https://github.com/timelessco/renderless-components/commit/4bfbb21169be5798eb665435b5bb7deb9938eaf5))
- **progress:** 🏷️ update types
  ([07a536a](https://github.com/timelessco/renderless-components/commit/07a536a82b20c9dbafcc7abdb07dd2d91492f1df))
- added all keys
  ([6359fa7](https://github.com/timelessco/renderless-components/commit/6359fa76d535b80c15b768ec75765207c1a123ee))
- updated review requests
  ([7f06658](https://github.com/timelessco/renderless-components/commit/7f06658ddac9511fd24784543e27fcbe8644e0cf))

### Build System

- **babel:** 💚 ignore tests and stories from build
  ([d0c090b](https://github.com/timelessco/renderless-components/commit/d0c090b3c3f45d661b2e6da2bbdead3cde1bc712))
- **build-script:** 🔧 change scripts to run in parallel
  ([46e86ee](https://github.com/timelessco/renderless-components/commit/46e86ee0fc877ef04d38cd91126179855b54da6b))
- **cjs:** 🔧 add correct bable cjs package
  ([ce9ec88](https://github.com/timelessco/renderless-components/commit/ce9ec884a4c243a6c512bb721d0e75850bbe69e9))
- **release:** 👷 add a release pipeline with standard version
  ([62c2ef6](https://github.com/timelessco/renderless-components/commit/62c2ef65c76485dbf2ef1a3521c27cb985afa2b0))
- **rollup:** 🔧 add unminified umd and reduce peer deps version
  ([b04f6d2](https://github.com/timelessco/renderless-components/commit/b04f6d2e823177eacbc784f7b70f7fd2e96bf13e))
- **tsc:** 🔧 remove tests & types from build types
  ([0222f0e](https://github.com/timelessco/renderless-components/commit/0222f0ead2c4f8db967f0d0fc5d4c81b78484a5e))
- **umd:** 🔧 add umd rollup plugin
  ([a75ac2f](https://github.com/timelessco/renderless-components/commit/a75ac2f18a3b0f5fdc125dcf8b795881e1a8fa78))
- **umd:** 🔧 update rollup & bundlesize
  ([05f6457](https://github.com/timelessco/renderless-components/commit/05f645794edf606f985061f96bda99cf33f0d0db))
- added rimraf and crossenv
  ([a147c93](https://github.com/timelessco/renderless-components/commit/a147c9350858f0e72f8d68d8fd4f79193eab5d5d))
