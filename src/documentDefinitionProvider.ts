import vscode = require('vscode');
import { vbaSymbols } from './extension';

export class VbaDocumentDefinitionProvider implements vscode.DefinitionProvider {
    public provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.DefinitionLink[]> {
        const wordRange = document.getWordRangeAtPosition(position);
        const currentWord = document.getText(wordRange);
        let definitions: vscode.DefinitionLink[] = [];

        for (const symbol of vbaSymbols) {
            if (currentWord === symbol.name) {
                definitions.push({
                    targetUri: symbol.uri,
                    targetRange: symbol.range,
                    targetSelectionRange: symbol.range
                });
                return Promise.resolve(definitions);
            }
        }
        return Promise.reject();
    }
}