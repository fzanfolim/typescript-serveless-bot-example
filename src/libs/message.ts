



export default{
    BOAS_VINDAS: 'Bem vindo ao atendimento eletônico do Pizza Planet \n \n Para iniciar o atendimento por favor informe seu CPF.',
    OPCOES_CATEGORY: (nome:string) =>`${nome}, o que você deseja, temos: \n \n Pizzas , \n Calzones, \n  Bebidas`,
    MESMO_PEDIDO: (lastOrder:{categoria:string, item:string},nome) => `${nome}, identificamos que o seu ultimo pedido foi ${lastOrder.categoria} - ${lastOrder.item}, você quer repetir o pedido?`,
    OBRIGADO: 'Obrigado :) \n Registramos seu pedido com sucesso !',
    EFETIVA_ORDEM: (setOrder:{categoria:string, item:string, id:string}) => `Seu produto escolhido foi: \n ${setOrder.categoria} - ${setOrder.item} \n Sua ordem de compra é : ${setOrder.id} \n Muito Obrigado pela escolha!`,
    LISTA_PRODUTOS: (produtos:string) =>`Informe o numero do produto desejado: \n ${produtos}`,
}

