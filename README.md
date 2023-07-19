# BC-Responsive
* Automatically sends msg when the user reaches a certain state (slapped, orgasm, etc).
* When auto msg triggers, your input would be interrupted.
  * Do not interrupt emote, whishper, '/' command or MBCHC's '@' action。
## Install
* #### TamperMonkey install : [link](https://github.com/dDeepLb/BC-Responsive/raw/main/loader.user.js).
* #### Bookmarklet :
 ```
javascript:(()=>{fetch('https://github.com/dDeepLb/BC-Responsive/raw/main/main.js').then(r=>r.text()).then(r=>eval(r));})();
```
## Configuration
After install this script , there will be a <img style="height:32px; width:32px" src="https://github.com/dDeepLb/BC-Responsive/assets/71733861/83fb14ab-79af-46b4-9490-ea8c85dc4097">
 button in the right-down corner of setting screen, click on that to enter `Repsonsive` setting.

In setting page, you can see some textbox that contains phrases.
Every phrases should be quoted by `"`, and then separated by `,`.
Every phrases in same textbox will be triggered with same possibilitiy.
When empty phrases (`""`) is triggered, no messeage will be produced.

For example, the following is default low setting.

```
"", "", "mh", "♥oh♥", "ah", "...♥"
```

There are six phrases here (` `, ` `, `mh`, `♥oh♥`, `ah`, `...♥`), the first two is empty phrases.

1. **low** : triggers when being masturbated. Also triggers when **pain**/**tickle** triggers if you like the interaction (in arousal setting).
2. **light** : triggers when being masturbated. Also triggers when **pain**/**tickle** triggers if you like the interaction (in arousal setting).
3. **medium** : triggers when being masturbated. Also triggers when **pain**/**tickle** triggers if you like the interaction (in arousal setting).
4. **hot** : triggers when being masturbated. Also triggers when **pain**/**tickle** triggers if you like the interaction (in arousal setting).
5. **orgasm** : triggers at orgasms.
6. **pain** : triggers when spanked/pinched/slapped/shocked.
7. **tickle** : triggers when tickled.
