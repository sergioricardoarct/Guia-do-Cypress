/// reference types="cypress"/>

describe.skip("Guia de Validações básicas",()=>{
    describe("Validações Numéricas",()=>{
        
        it("Igualdades ", ()=>{
            const a= 10;

            expect(a).equal(10);    
        })

        it("Diferenças positivas", ()=>{
            const a= 10;

            expect(a).to.not.equal(11);    
        })
    })

    describe("Validações Gerais", ()=>{
       
        it("Booleanas", ()=>{
            const a= true;
            const b= null;
            let c;

            expect(a).to.be.true;
            expect(true).to.be. true;
            expect(b).to.be.null;
            expect(a).to.be.not.null;
            expect(c).to.be.undefined
        })

        describe("Objetos", ()=>{
            it("Objetos",()=>{

                const obj={
                    a:1,
                    b:2
                }
                expect(obj).eq(obj)
                expect(obj).equal(obj)
                expect(obj).equals(obj)
                expect(obj).eql({a: 1,b: 2})
                expect(obj).include({a:1})
                expect(obj).to.have.property('b',2)
                expect(obj).to.not.be.empty
                expect({}).to.be.empty
            })
        })

        describe("Arrays", ()=>{
            it("Array", ()=>{
                const arr = [1,2,3,]
                
                expect(arr).to.have.members([1,2,3])
                expect(arr).to.include.members([1,2,3])
                expect(arr).to.be.not.empty
                expect([]).to.be.empty
                expect([0]).to.be.not.undefined
            })
        })

        describe("Types", ()=>{
            it("Types", ()=>{

                const num= 1
                const str = "string"

                expect(num).to.be.a('number')
                expect(str).to .be.a('string')
                expect({}).to.be.an('Object')
            })
        })


        describe("Strings e numeros", ()=>{
            it("Strings", ()=>{

                const str= "Teste de string"

                expect(str).to.be.equal('Teste de string')
                expect(str).to.have.length(15)
                expect(str).to.contains("de")
                expect(str).to.match(/de/)
                expect(str).to.match(/^Teste/)
                expect(str).to.match(/string$/)
                expect(str).to.match(/.{15}/)
                expect(str).to.match(/|w+/)
                expect(str).to.match(/|0+/)
            })
            it("Numeros", ()=>{

                const num1=4
                const num2 = 3.56

                expect(num1).to.be.equal(4)
                expect(num1).to.be.above(3)
                expect(num1).to.be.below(6)

                expect(num2).to.be.equal(3.56)
                expect(num2).to.be.closeTo(3.2,0.5)
                expect(num2).to.be.above(3)
            })
        })

    })
})

describe.skip("Cypress Básico", ()=>{

    describe("Usabilidades", ()=>{
        it("Acessar página", ()=>{
            cy.visit("https://wcaquino.me/cypress/componentes.html")
                cy.title().should('to.be.equal','Campo de Treinamento' )
                cy.title().should('contain','Campo' )
        })

        it("Localizar e interagir com elementos", ()=>{
            cy.visit("https://wcaquino.me/cypress/componentes.html")
                cy.get('#buttonSimple')
                    .click()            
                    .should('have.value', 'Obrigado!')
        })

        it.skip("Pausa e Debug", ()=>{
            cy.visit("https://wcaquino.me/cypress/componentes.html")

            cy.pause()

            cy.title().should('to.be.equal','Campo de Treinamento')
            cy.title().should('contain','Campo').debug()

        })
    })

    describe("Interações", ()=>{
        before(() => {
            cy.visit("https://wcaquino.me/cypress/componentes.html") 
          }) 

        it("Com texto", ()=>{
            
            cy.get('body').should('contain', 'Cuidado')
            cy.get('span').should('contain', 'Cuidado')
            cy.get('.facilAchar').should('contain', 'Cuidado')
            cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
        })
    

        it("Com Links e reload", ()=>{
            cy.visit("https://wcaquino.me/cypress/componentes.html")
            cy.get('[href="#"]').click({delay:100})
                cy.get('#resultado').should('have.text', 'Voltou!')

            cy.reload()
            cy.contains('Voltar').click()
                cy.get('#resultado').should('have.text', 'Voltou!')
        })

        it("Campos de textos", ()=>{
            cy.visit("https://wcaquino.me/cypress/componentes.html")
            cy.get('#formNome').type("Guia do Cypress")
                .should('have.value', 'Guia do Cypress')
                
            cy.get('#elementosForm\\:sugestoes')  /*lembrar que as vezes caracteres não são lidos, por isso o "\\" */
                .type("Guia do Cypress")
                .should('have.value', 'Guia do Cypress')

            cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
                .type("Guia do Cypress")
                .should('have.value', 'Guia do Cypress')

            cy.get('[data-cy="dataSobrenome"]')
                .type("Guia do Cypresss1{backspace}{backspace}",{delay:100})
                .should('have.value', 'Guia do Cypress')

            cy.get('#elementosForm\\:sugestoes')
                .clear()
                .type("Texto errado{selectall}Novo",{delay:100})
                .should('have.value', 'Novo')
        })
        it("Radio Button", ()=>{
            cy.visit("https://wcaquino.me/cypress/componentes.html")

            cy.get('[name="formSexo"]')
                .should("to.have.length",2)

            cy.get('#formSexoFem').click()
            .should("be.checked")   

            cy.get('#formSexoMasc').should("not.be.checked") 
        })

        it("CheckBox", ()=>{
            cy.visit("https://wcaquino.me/cypress/componentes.html")

            cy.get('#formComidaPizza').click()
                .should('to.be.checked')

            cy.get('[name=formComidaFavorita]').click({multiple:true}) /* para testar vários*/

            cy.get('#formComidaVegetariana').click()
                .should('to.be.not.checked')

            cy.get('#formComidaPizza').click()
                .should('to.be.checked')

        })
        
        it("Combobox", ()=>{
            cy.visit("https://wcaquino.me/cypress/componentes.html")

            cy.get('[data-test="dataEscolaridade"]').select("2o grau completo")
                .should("be.value","2graucomp") /* tem que validar com o value, não com o da option */
        })

        it("Combo Múltiplo", ()=>{
            cy.visit("https://wcaquino.me/cypress/componentes.html")

            cy.get('[data-testid="dataEsportes"]').select(["natacao","Corrida"])/* Value*/

        })
    })

})

describe.skip("Sincronismos", ()=>{
    beforeEach(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")
    })

    it("delay e wait", ()=>{
        cy.get('#novoCampo').should("not.exist")
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should("not.exist")
        cy.get('#novoCampo').should("exist")
        cy.get('#novoCampo'). type("Apareceu!")

    })
    
    it("Retrys", ()=>{
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            .should("exist") 

        /*O should retorar o mesmo objeto no mesmo GET, então testar varias vezes o objeto 
        retornará o mesmo, assim retornando a mesma coisa*/
        /*Mas se fizer outro GET, ele fará normalmente*/
    })

    it("Elemento buscado por find", ()=>{
        
        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span') 
            .should("to.be.visible")
            .should("contain","Item 1")

         /*As retrys temtam sempre resecultar os comandos anteriores até a execução passar,
         se não a ação ainda não existir como no caso anterior, procuarndo o span com o item
         2, o cypress trava a execução e mostra erro.
         */   
            cy.get('#lista li span')
                .should("to.be.visible")
                .should("contain","Item 2")
    })

    it("Timeout e wait", ()=>{
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo',{timeout:5000}).should("exist")/*tempo em milisegundos*/

        cy.get('#buttonListDOM').click()
        cy.wait(3000)                           /*Tentar não usar pois ele é fixo, e dependedo da 
                                                da apliação ela atrapalha. O melhor é usar o timeout */
        cy.get('#lista li span')
            .should("contain","Item 2")
    })
    
    it("should e then", ()=>{
        cy.get('#buttonListDOM').click()
        
        cy.get('#lista li span').should($el => {
            console.log($el)
            expect($el).to.have.length(1)}) /* o should dispara sempre que inicia a verificação
                                                do elemento na mesma ação do get */
        
        cy.get('#lista li span').then($el => {
            console.log($el)
            expect($el).to.have.length(1)})  /* o then dispara a verificação
                                                do elemento depois que o get foi feito*/                                   
    })
})

describe("Helpers", ()=>{
    before(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")
    })
    it("Wrap", ()=>{
        cy.get('#formNome')
        .then($el=>{cy.wrap($el).type("escrever")}) /* emcasula funções que não são do cypress,
                                                    mais continuam sendo maeadas*/
    })
    it("Its", ()=>{
        const obj ={ nome:'Sergio' , idade:41}
            expect(obj).to.have.property("nome")
        cy.wrap(obj).should("have.property", "nome","Sergio") /*feito com wrap, aqui a propriedade pode exitir ou não */

        cy.wrap(obj).its('nome').should("to.be.equal",'Sergio') /*aqui a prpriedade já é especificamente selecionada */
    })

    it.only("Invoke ", ()=>{             /*chama funções, o its chama propriedades */
        const fucValue = ()=> 10;
        const soma = (a,b) => a+b;
		
        cy.wrap({fn: fucValue}).invoke('fn')
            .should("be.equal", 10)

        cy.wrap({fns: soma}).invoke('fns', 1,3)
            .should("be.equal", 4)       
            })

})

describe("Cypress Intermediário", ()=>{
    before(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")
        
      })

    it("Nome do teste", ()=>{
        

    })
    
})




///---------- Mockup do cypress ---------///

describe("Nome do conjunto de teste", ()=>{
    before(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")
        
      })
    beforeEach(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")
        
      })

    after(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")
        
      })
    afterEach(() => {
        cy.visit("https://wcaquino.me/cypress/componentes.html")
        
      })

    it("Nome do teste", ()=>{
        

    })
})
