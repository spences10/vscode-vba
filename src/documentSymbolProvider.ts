// Reference:
//   https://code.visualstudio.com/api/language-extensions/programmatic-language-features#show-all-symbol-definitions-within-a-document
//   https://github.com/Gimly/vscode-fortran/blob/229cddce53a2ea0b93032619efeef26376cd0d2c/src/documentSymbolProvider.ts
import vscode = require('vscode');
import { VbaSymbol, vbaSymbols } from './extension';

export class VbaDocumentSymbolProvider implements vscode.DocumentSymbolProvider {

    public provideDocumentSymbols(
        document: vscode.TextDocument,
        token: vscode.CancellationToken): vscode.SymbolInformation[] {

        console.log('VbaDocumentSymbolProvider.provideDocumentSymbols');
        // [Public | Private | Friend] [Static] Function name [(arglist)] [As type]
        // [Public | Private | Friend] [Static] Sub name [(arglist)]
        const functionRegex = /^\s*((Public|Private|Friend)\s+)?((Static)\s+)?(Function|Sub)\s+(\w+)/i;

        const result: vscode.SymbolInformation[] = [];
        vbaSymbols.splice(0);

        for (let line = 0; line < document.lineCount; line++) {
            var text = document.lineAt(line);
            let matches = text.text.match(functionRegex);
            if (matches) {
                const symbol = new VbaSymbol(matches[6], document.uri, text.range);
                vbaSymbols.push(symbol);
                result.push(
                    new vscode.SymbolInformation(
                        matches[6],
                        vscode.SymbolKind.Function,
                        '',
                        new vscode.Location(document.uri, text.range)
                    ));
            }
        }

        return result;
    }
}