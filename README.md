Start Server
============

```
npm install
node app.js
```

Will listen on `3000`

Start Client
=============
```
node client.js
```
will say
```
======================
zipCode to barCode: 1
barCode to zipCode: 2
quit: 3
please input (1-3):
======================
请输入您的选择:
--------------------
```


if you input 1:
===============
---------------
```
请输入您的选择:1
请输入zipCode:
```
if you input 合法的zipCode:

```
请输入zipCode:12345
```

you will see:
```
|:::||::|:|::||::|::|:|:|::|:|:|

======================
zipCode to barCode: 1
barCode to zipCode: 2
quit: 3
please input (1-3):
======================

请输入您的选择:
```

if you input 不合法的 zipCode:
```
请输入zipCode:1234
```

you will see:
```
请输入合法的zipCode:
```

if you input 2:
===============
---------------
```
请输入您的选择:2
请输入barCode:
```

if you input 合法的 barCode：
```
请输入barCode：|:::||::|:|::||::|::|:|:|::|:|:|
```
you will see:
```
12345

======================
zipCode to barCode: 1
barCode to zipCode: 2
quit: 3
please input (1-3):
======================

请输入您的选择:
```

if you input 不合法的 barCode:
```
请输入barCode:|:::||::|
```

you will see:
```
请输入合法的barCode:
```


if you input 3,it will exit:
============================
```
请输入您的选择:3
```

if you input 4:
===============
```
请输入您的选择:4
请给出合法的输入！！！

======================
zipCode to barCode: 1
barCode to zipCode: 2
quit: 3
please input (1-3):
======================

请输入您的选择:

```
