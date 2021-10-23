# Dapper

https://github.com/DapperLib/Dapper

Por padrão o Dapper não faz nenhum pré-tratamento quando trabalha com strings, o default é ```nvarchar(4000)```, para que você possa definir qual o tipo de string deseja passar como parâmetro, o Dapper te entrega a classe ```DbString```, e como não é tão simples entender os parametros IsAnsi e IsFixedLenght, fiz essa extensão para tipar de forma mais fácil o seu parametro:

```c#
using Dapper;

namespace DapperHelper
{
    public static class DbStringBuilder
    {
        public static DbString CHAR(int length, string value)
        {
            return new DbString { Value = value, Length = length, IsAnsi = true, IsFixedLength = true };
        }
        public static DbString NCHAR(int length, string value)
        {
            return new DbString { Value = value, Length = length, IsAnsi = false, IsFixedLength = true };
        }
        public static DbString VARCHAR(int length, string value)
        {
            return new DbString { Value = value, Length = length, IsAnsi = true, IsFixedLength = false };
        }
        public static DbString NVARCHAR(int length, string value)
        {
            return new DbString { Value = value, Length = length, IsAnsi = false, IsFixedLength = false };
        }
    }
}
```

Uso:

```c#
using DapperHelper;

DbStringBuilder.NCHAR(length: 128, value: "olá mundo")
```





O banco de dados quando não tem certeza de que os dados pesquisados são iguais faz uma pesquisa varrendo o banco de dados inteiro, quando você não informa na query o mesmo tipo de parâmetro passado igual ao campo a pesquisa fica muito mais pesada, então por questões de performance tente sempre fazer com que o parâmetro seja do mesmo tipo do campo pesquisado.