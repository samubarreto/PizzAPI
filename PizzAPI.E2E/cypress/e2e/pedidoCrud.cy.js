describe('Crud de pedidos', () => {
  const timestamp = new Date().getTime();

  it('Carrega os pedidos já cadastradas', () => {
    cy.visit('/pedidos');
    cy.get('#h1-title').should('contain', 'PizzAPI🍕');
  });

  it('Cadastra uma nova pizza para usar nos pedidos', () => {
    cy.visit('/pizzas');
    cy.get('button').contains('Nova Pizza ➕').click();
    cy.get('input[name="sabor"]').type(`Pizza de Teste ${timestamp}`);
    cy.get('#descricao').type('Descrição da pizza de teste');
    cy.get('input[name="urlImagem"]').type('https://www.minhareceita.com.br/app/uploads/2022/12/pizza-de-pepperoni-caseira-portal-minha-receita.jpg');
    cy.get('input[name="preco"]').type('19.9');
    cy.get('input[name="peso"]').type('0.5');
    cy.get('#massa').select(1);
    cy.get('#tamanho').select(2);
    cy.get('#recheioBorda').select(1);
    cy.get('input[name="disponivel"]').check();
    cy.get('button').contains('Confirmar').click();
    cy.get('#pizzas-container').should('contain', `Pizza de Teste ${timestamp}`);
  });

  it('Cadastra um novo pedido', () => {
    cy.visit('/pedidos');
    cy.get('button').contains('Novo Pedido ➕').click();
    cy.get('input[name="cliente"]').type(`Cliente de Teste ${timestamp}`);
    cy.get('#endereco').type('Rua Teste da Silva, 123');
    cy.get('#metodoPagamento').select(4);
    cy.get('#status').select(1);
    cy.get('#observacoes').type('Sem azeitona');
    cy.get('#pizzas-selecionaveis input[type="number"]').first().clear().type('2', { force: true });
    cy.get('button').contains('Salvar').click();
    cy.get('#pedidos-container').should('contain', `Cliente de Teste ${timestamp}`);
  });

  it('Edita um pedido cadastrado', () => {
    cy.visit('/pedidos');
    cy.get('#pedidos-container').contains(`Cliente de Teste ${timestamp}`).get('button').contains("Editar").click();
    cy.get('#status').select(2);
    cy.get('input[name="cliente"]').clear().type(`Cliente de Teste ${timestamp} editado`);
    cy.get('button').contains('Salvar').click();
    cy.get('#pedidos-container').should('contain', `Cliente de Teste ${timestamp} editado`);
  });

  it('Busca um pedido cadastrado', () => {
    cy.visit('/pedidos');
    cy.get('#searchbar').type(`Cliente de Teste ${timestamp} editado`);
    cy.get('#pedidos-container').should('contain', `Cliente de Teste ${timestamp} editado`);
    cy.get('#pedidos-container').should('contain', '398.00');
    cy.get('#pedidos-container').children().should('have.length', 1);
  });

  it('Busca um pedido cadastrado pelo preço', () => {
    cy.visit('/pedidos');
    cy.get('#searchbar').type('398.00');
    cy.get('#pedidos-container').should('contain', `Cliente de Teste ${timestamp} editado`);
    cy.get('#pedidos-container').should('contain', '398.00');
  });

  it('Busca um pedido que não existe', () => {
    cy.visit('/pedidos');
    cy.get('#searchbar').type('Pedido q não existe');
    cy.get('#pedidos-container').should('not.contain', 'Pedido q não existe');
    cy.get('#pedidos-container').children().should('have.length', 0);
  });

  it('Deleta um pedido cadastrado', () => {
    cy.visit('/pedidos');
    cy.get('#pedidos-container').contains(`Cliente de Teste ${timestamp} editado`).get('button').contains('Deletar').click();
    cy.get('button').contains('Confirmar').click();
    cy.get('#pedidos-container').should('not.contain', `Cliente de Teste ${timestamp} editado`);
  });
})