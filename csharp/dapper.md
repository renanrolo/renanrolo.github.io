# Dapper

https://github.com/DapperLib/Dapper

Por padrão o Dapper não faz nenhum pré-tratamento quando trabalha com strings, o default é ```nvarchar(4000)```, para que você possa definir qual o tipo de string deseja passar como parâmetro, o Dapper te entrega a classe ```DbString```, e como não é tão simples entender os parametros IsAnsi e IsFixedLenght, fiz essa extensão para tipar de forma mais fácil o seu parametro:



<script src="https://gist.github.com/renanrolo/caae2aa897f87a54ad9fff00bcdb3988.js"></script>

Uso:

```
using DapperHelper;

DbStringBuilder.NCHAR(length: 128, value: "olá mundo")
```





O banco de dados quando não tem certeza de que os dados pesquisados são iguais faz uma pesquisa varrendo o banco de dados inteiro, quando você não informa na query o mesmo tipo de parâmetro passado igual ao campo a pesquisa fica muito mais pesada, então por questões de performance tente sempre fazer com que o parâmetro seja do mesmo tipo do campo pesquisado.