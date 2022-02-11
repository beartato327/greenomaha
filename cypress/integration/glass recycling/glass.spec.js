describe("example recycling app", () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080/")
    })

    it("testing glass dropdown functionality", () => {
        cy.get(".mdi-chevron-down").eq(0).click()
        cy.get(".v-btn").eq(0).click()
        cy.contains("Submit").click()
        cy.contains("Close").click()
        cy.get(".mdi-chevron-down").eq(0).click()
    })

    it("testing full-service recycling functionality", () =>{
        cy.get(".mdi-chevron-down").eq(1).click()
        cy.get(".v-btn").eq(1).click()
        cy.contains("Submit").click()
        cy.contains("Close").click()
        cy.get(".mdi-chevron-down").eq(1).click()
    })
})