---
title: Processos congelados - Task.Wait
author: Renan Rolo
date: 2024-06-24
category: c#
layout: post
---

# Resolvendo Processos congelados com 'Task.Wait(timer)'

Tive um problema com um método que estava travado/congelando por estar tentando se conectar com uma impressora, e para piorar estavamos usando uma classe singleton com lock para impedir que outras execuções rodassem o processo várias vezes e duplicassem o resultado.

O foco aqui é uma forma de válidar que um método ultrapassou o tempo limite para execução.

```csharp
TimeSpan timer = TimeSpan.FromMinutes(10);

Task task = new Task(() =>
{
    ProblematicMethod();
});

task.Start();

if (!task.Wait(timer))
{
    throw new Exception("Timeout error");
}
```

O ponto principal aqui é o uso de uma `Task` com o seu método `Wait`.
Ao passar um "tempo" como parametro para o método `Wait` ele retornará `true` se a `Task` executou DENTRO do tempo definido, ou `false` caso o contrário.
Cabe ao desenvolvedor desenvolver a estratégia do que fazer caso tenha atingido o tempo limite.

# Recomendação

Uma recomendação que eu faço é utilizar essa abordagem ao processar uma lista, ao invés de fazer um "Timeout" para todo o processo, faça para cada elemento da lista que está sendo processado, dessa forma se a lista aumentar de tamanho não influenciará na sua definição de timeout, veja o exemplo a seguir:

```csharp
public void Main()
{
    var list = GetAllElementsToBeProcessed();

    foreach(var item in list)
    {
        ProcessWithTimeout(item);
    }
}

public void ProcessWithTimeout()
{
    TimeSpan timer = TimeSpan.FromMinutes(10);

    Task task = new Task(() =>
    {
        ProblematicMethod();
    });

    task.Start();

    if (!task.Wait(timer))
    {
        throw new Exception("Timeout error");
    }
}
```

Repare que ao dar erro de limite te tempo ultrapassado é disparado uma Exceção, e a idéia é essa mesmo, porque esse é o pior cenario possivel nesse exemplo, não há porque continuar com o processo dos outros elementos se 10 minutos se passaram, a unica coisa a fazer é avisar o administrador e rezar... mas pelo menos você vai destravar o servidor/aplicação =D