import vscode = require('vscode');
import { vbaSymbols } from './extension';

export class VbaHoverProvider implements vscode.HoverProvider {
    public provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<vscode.Hover> {
        const textRange = document.getWordRangeAtPosition(position);
        const targetText = document.getText(textRange);

        for (const symbol of vbaSymbols) {
            if (symbol.name === targetText) {
                const symbolCode = document.getText(symbol.range).trim();
                const hoverText: vscode.MarkdownString = new vscode.MarkdownString();
                hoverText.appendCodeblock(symbolCode, document.languageId);
                const hover = new vscode.Hover(hoverText);
                return Promise.resolve(hover);
            }
        }
        return Promise.reject();
    }
}