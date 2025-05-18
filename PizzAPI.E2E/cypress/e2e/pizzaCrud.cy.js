describe('Crud de pizzas', () => {
  const timestamp = new Date().getTime();

  it('Carrega as pizzas já cadastradas', () => {
    cy.visit('/pizzas');
    cy.get('#h1-title').should('contain', 'PizzAPI🍕');
  });

  it('Cadastra uma nova pizza', () => {
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

  it('Edita uma pizza cadastrada', () => {
    cy.visit('/pizzas');
    cy.get('button').contains('Editar').click();
    cy.get('input[name="sabor"]').clear().type(`Pizza de Teste ${timestamp} editada`);
    cy.get('button').contains('Confirmar').click();
    cy.get('#pizzas-container').should('contain', `Pizza de Teste ${timestamp} editada`);
  });

  it('Busca uma pizza cadastrada', () => {
    cy.visit('/pizzas');
    cy.get('#searchbar').type(`Pizza de Teste ${timestamp} editada`);
    cy.get('#pizzas-container').should('contain', `Pizza de Teste ${timestamp} editada`);
    cy.get('#pizzas-container').children().should('have.length', 1);
  });

  it('Busca uma pizza cadastrada pelo preço', () => {
    cy.visit('/pizzas');
    cy.get('#searchbar').type('19.9');
    cy.get('#pizzas-container').should('contain', `Pizza de Teste ${timestamp} editada`);
    cy.get('#pizzas-container').should('contain', '19.90');
  });

  it('Busca uma pizza que não existe', () => {
    cy.visit('/pizzas');
    cy.get('#searchbar').type('Pizza q não existe');
    cy.get('#pizzas-container').should('not.contain', 'Pizza q não existe');
    cy.get('#pizzas-container').children().should('have.length', 0);
  });

  it('Deleta uma pizza cadastrada', () => {
    cy.visit('/pizzas');
    cy.get('#pizzas-container').contains(`Pizza de Teste ${timestamp} editada`).get('button').contains('Deletar').click();
    cy.get('button').contains('Confirmar').click();
    cy.get('#pizzas-container').should('not.contain', `Pizza de Teste ${timestamp} editada`);
  });
})