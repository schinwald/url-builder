import { expect, test } from 'bun:test'
import { URLBuilder } from '../src'


test('base string', () => {
	const url = URLBuilder({
		base: 'https://www.example.com'
	})

	expect(url).toBe('https://www.example.com')
})

test('base object', () => {
	const url = URLBuilder({
		base: {
			scheme: 'https',
			domains: 'www.example.com',
		}
	})

	expect(url).toBe('https://www.example.com')
})

test('base object with hidden port', () => {
	const url = URLBuilder({
		base: {
			scheme: 'https',
			domains: 'www.example.com',
			port: 443
		}
	})

	expect(url).toBe('https://www.example.com')
})

test('base object with hidden port', () => {
	const url = URLBuilder({
		base: {
			scheme: 'https',
			domains: 'www.example.com',
			port: 1234
		}
	})

	expect(url).toBe('https://www.example.com:1234')
})

test('username authentication', () => {
	const url = URLBuilder({
		base: {
			authentication: {
				username: 'alice',
			},
			scheme: 'https',
			domains: 'www.example.com',
		},
	})

	expect(url).toBe('https://alice@www.example.com')
})

test('username & password authentication', () => {
	const url = URLBuilder({
		base: {
			authentication: {
				username: 'alice',
				password: '1234'
			},
			scheme: 'https',
			domains: 'www.example.com',
		}
	})

	expect(url).toBe('https://alice:1234@www.example.com')
})

test('path', () => {
	const url = URLBuilder({
		base: 'https://www.example.com',
		path: '/path/to/resource',
	})

	expect(url).toBe('https://www.example.com/path/to/resource')
})

test('query string', () => {
	const url = URLBuilder({
		base: 'https://www.example.com',
		query: {
			height: '16',
			width: '32'
		}
	})

	expect(url).toBe('https://www.example.com?height=16&width=32')
})

test('fragment', () => {
	const url = URLBuilder({
		base: 'https://www.example.com',
		fragment: 'come-back-here'
	})

	expect(url).toBe('https://www.example.com#come-back-here')
})