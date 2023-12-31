describe('Tasks Page', () => {
  it('All Tasks Loaded', () => {
    cy.visit('/')
    cy.contains('ALL TASKS')
    cy.get('.task-item').should('have.length', 6)
  })

  it('Search & Reset Filters', () => {
    cy.visit('/')
    cy.contains('ALL TASKS')
    cy.get('.task-item').should('have.length', 6)
    cy.get('.search input').type('1')
    cy.get('.search button:first-of-type').click()
    cy.get('.task-item').should('have.length', 2)
    cy.get('.search input').type('2')
    cy.get('.search button:first-of-type').click()
    cy.get('.task-item').should('have.length', 0)
    cy.contains('Nothing found')
    cy.get('.search button:last-of-type').click()
    cy.get('.task-item').should('have.length', 6)
  })

  it('Filter by Each Type & Reset Filters', () => {
    cy.visit('/')
    cy.contains('ALL TASKS')
    cy.contains('Filter by Type:')
    cy.get('.type #general').click()
    cy.get('.task-item').should('have.length', 2)
    cy.get('.type #hydration').click()
    cy.get('.task-item').should('have.length', 1)
    cy.get('.type #medication').click()
    cy.get('.task-item').should('have.length', 2)
    cy.get('.type #nutrition').click()
    cy.get('.task-item').should('have.length', 1)
    cy.get('.search button:last-of-type').click()
    cy.get('.task-item').should('have.length', 6)
  })

  it('Edit Task', () => {
    cy.visit('/')
    cy.contains('ALL TASKS')
    cy.contains('Take the rubbish out')
    cy.get('.tasks .task-item:first-of-type button').click()
    cy.contains('EDIT TASK')
    cy.contains('Take the rubbish out')
    cy.get('.task textarea:first-of-type').type(' & change bag')
    cy.get('.task textarea:last-of-type').type(' & wash bin')
    cy.get('.task button:first-of-type').click()
    cy.contains('ALL TASKS')
    cy.contains('change bag')
    cy.contains('wash bin')
  })

  it('Delete Task', () => {
    cy.visit('/')
    cy.contains('ALL TASKS')
    cy.get('.task-item').should('have.length', 6)
    cy.get('.tasks .task-item:first-of-type button').click()
    cy.contains('EDIT TASK')
    cy.get('.task button.delete').click()
    cy.contains('ALL TASKS')
    cy.get('.task-item').should('have.length', 5)
  })
})
