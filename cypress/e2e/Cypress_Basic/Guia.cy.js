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

describe("Cypress Básico", ()=>{

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
            cy.get('#formSexoFem').click()
            .should("be.checked")   

            cy.get('#formSexoMasc').should("not.be.checked") 
        })
        
        
    })

})





///---------- Mockup do cypress ---------///

describe("Nome do conjunto de teste", ()=>{
    before()
    beforeEach()
    after()
    afterEach()

    it("Nome do teste", ()=>{
        

    })
})