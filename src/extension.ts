// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { VbaDocumentSymbolProvider } from './documentSymbolProvider';
import { VbaDocumentDefinitionProvider } from './documentDefinitionProvider';
import { VbaHoverProvider } from './hoverProvider';

export let vbaSymbols: VbaSymbol[] = [];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vba" is now active!');

	context.subscriptions.push(
		vscode.languages.registerDocumentSymbolProvider(
			'vba', new VbaDocumentSymbolProvider()
		)
	);
	context.subscriptions.push(
		vscode.languages.registerDefinitionProvider(
			'vba', new VbaDocumentDefinitionProvider()
		));
	context.subscriptions.push(
		vscode.languages.registerHoverProvider(
			'vba', new VbaHoverProvider()
		));
}

export class VbaSymbol {
	name: string;
	uri: vscode.Uri;
	range: vscode.Range;

	constructor(name: string, uri: vscode.Uri, range: vscode.Range) {
		this.name = name;
		this.uri = uri;
		this.range = range;
	}
}