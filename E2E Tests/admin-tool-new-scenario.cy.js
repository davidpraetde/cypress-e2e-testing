const loginProNovaCloud = () => {
	cy.visit('https://devirl-portal.tde.at/master/administration2/#/15F4278E-DE6F-480E-B2D4-74597E8DF3B3/home')
	cy.url().should('include', 'login.tde.at/adfs/oauth2/authorize')

	cy.on('uncaught:exception', (err, runnable) => {
		return false
	})

	cy.get('input#emailInput').type('standard-user')
	cy.get('input.submit').click()
	cy.url().should('include', 'login.tde.at/IdentityServer/account/signin')

	cy.get('input#UserName').type('user-name')
	cy.get('input#Password').type('password')
	cy.get('input[type="submit"].button').click()

	cy.url().should('include', 'devirl-portal.tde.at/master/administration2')
}

const selectDropdownItem = (selector, optionText) => {
	cy.get(selector).find('input[type="search"]').click()
	
	cy.get('.ant-select-dropdown :not(.ant-select-dropdown-hidden)').find('.ant-select-item-option').each(el => {
		if (el.text() == optionText) {
			cy.wrap(el).click({force: true})
		}
	})
}

describe('Admin Tool Tests', () => {

	it('Create new scenario', () => {
		loginProNovaCloud()
		
		cy.get('li.ant-menu-item').contains('Scenarios').click()
		cy.url().should('include', '/scenario')
		
		cy.get('button').contains('Create scenario').click()
		cy.url().should('include', '/create')
		
		cy.get('div.ant-form-item:contains("Well name")').find('input[type="text"]').type('Integration Test Well')
		
		cy.get('div.ant-tabs-tab').contains('Project info').click()
		cy.get('div.ant-form-item:contains("Project name")').find('input[type="text"]').type('Integration Test Project')
		selectDropdownItem('div.ant-form-item:contains("Project unit system")', 'METRIC')
		selectDropdownItem('div.ant-form-item:contains("Time zone")', 'UTC')
		selectDropdownItem('div.ant-form-item:contains("Operator")', 'proNova')
		selectDropdownItem('div.ant-form-item:contains("Contractor")', 'AWS Cloud 2')
		
		cy.get('div.ant-tabs-tab').contains('Scenario info').click()
		cy.get('div.ant-form-item:contains("Scenario name")').find('input[type="text"]').type('Integration Test Scenario')
		selectDropdownItem('div.ant-form-item:contains("Rig")', 'Test Rig | offshore')
		selectDropdownItem('div.ant-form-item:contains("Analysis sector")', 'AWS Cloud 2')
		
		cy.get('div.ant-tabs-tab').contains('Channels').click()
		cy.get('button').contains('Create channels from template').click()
		
		cy.get('div.ant-tabs-tab').contains('Well info').click()
		cy.get('button.ant-btn-primary').contains('span', 'Create').click()
		
		cy.wait(15000)
		cy.url().should('include', '/scenario-overview')
		
		cy.get('li.ant-menu-item').contains('Scenarios').click()
		cy.url().should('include', '/scenario')
		
		cy.wait(5000)
		cy.get('div.ant-table').find('table').contains('td', 'Integration Test Scenario').should('be.visible')
	})

	it('Setup data fetcher', () => {
		expect(true).to.equal(true)
	})
	
	it('Delete scenario', () => {
		loginProNovaCloud()
		
		cy.get('li.ant-menu-item').contains('Wells').click()
		cy.url().should('include', '/well')
		
		cy.wait(5000)
		cy.get('div.ant-table').find('table').contains('td', 'Integration Test Well').click()
		cy.url().should('include', '/well/')
		cy.get('div.ant-form-item:contains("Well name")').find('input[type="text"]').should('have.value', 'Integration Test Well')
		
		cy.get('button').contains('Delete').click()
		cy.get('div.ant-popover-buttons').find('button').contains('Delete').click()
		
		cy.wait(5000)
		cy.url().should('include', '/well')
		
		cy.get('li.ant-menu-item').contains('Scenarios').click()
		cy.url().should('include', '/scenario')
		
		cy.wait(5000)
		cy.get('div.ant-table').find('table').contains('td', 'Integration Test Scenario').should('not.exist')
	})

})