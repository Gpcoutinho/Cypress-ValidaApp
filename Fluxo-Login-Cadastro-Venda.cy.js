
describe('Fluxo-Login-Cadastro-Venda', () => {
    beforeEach( () => {
        cy.visit('http://54.166.20.145:9080/desafioqa');
    })

    it('login-cadastro-venda', () => {

        //Realiza o login no sistema
        cy.get(':nth-child(1) > .input > input').type('admin', {log:false});
        cy.get(':nth-child(2) > .input > input').type('admin', {log:false});
        cy.get('.btn').click();

        cy.wait(3000);//Pausa

        //Limpa o banco de dados para evitar bugs
        cy.visit('http://54.166.20.145:9080/desafioqa/listarCliente');
        cy.get('.col-md-2 > .btn').click();
        cy.contains('#alertMessage', 'Base Limpa com sucesso').should('be.visible');
        

        //Faz o cadastro de um cliente no sistema
        cy.visit('http://54.166.20.145:9080/desafioqa/incluirCliente');
        cy.get('#nome').type('João', {log:false});
        cy.get('#cpf').type('12345678900', {log:false});
        cy.get('#saldoCliente').type('100,00', {log:false});
        cy.get('#botaoSalvar').click();
        cy.get('.btn-success').click();
        cy.get('#botaoSalvar').click();
        cy.contains('#alertMessage', 'Cliente salvo com sucesso').should('be.visible');
        cy.wait(3000);//Pausa

        //Lista todos os clientes
        cy.visit('http://54.166.20.145:9080/desafioqa/listarCliente');
        cy.get('.col-md-1 > .btn').click();
        cy.wait(3000);//Pausa

        //Realiza uma transação
        cy.visit('http://54.166.20.145:9080/desafioqa/incluirVenda');
        cy.get('#cliente').select("João");
        cy.get('#valorTransacao').type('52.00', {log:false});
        cy.get('#botaoSalvar').click();
        cy.contains('#alertMessage', 'Venda realizada com sucesso').should('be.visible');
        cy.wait(3000);//Pausa
        

        //Lista todas as transações
        cy.visit('http://54.166.20.145:9080/desafioqa/listarVenda');
        cy.get('.col-sm-12 > .btn').click();

        cy.wait(3000);//Pausa

        //Mostra o saldo após a transação
        cy.visit('http://54.166.20.145:9080/desafioqa/listarCliente');
        cy.get('.col-md-1 > .btn').click();

    })

})