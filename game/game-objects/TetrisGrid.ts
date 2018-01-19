import { TetrisBlock } from './TetrisUtils';

export class TetrisGrid {

    private blocksMap: Map<number, TetrisBlock[]> = new Map<number, TetrisBlock[]>();

    constructor(readonly numOfBlocksWide: number,
                readonly numOfBlocksHigh: number) {
        for (let i = 0; i < numOfBlocksHigh; i++) {
            this.blocksMap.set(i, []);
        }
    }

    public getAllBlocks(): TetrisBlock[] {
        let blocks: TetrisBlock[] = [];
        this.blocksMap.forEach((value) => {
            blocks.push(...value);
        });
        return blocks;
    }

    public giveBlocksToGrid(blocks: TetrisBlock[]) {
        blocks.forEach((block: TetrisBlock) => {
            this.blocksMap.get(block.yPos)!.push(block);
        });
    }

    public collisionDetection(blocks: TetrisBlock[]): boolean {
        return blocks
            .filter((block) => this.collisionDetected(block) || block.yPos > this.numOfBlocksHigh - 1)
            .length > 0
    }

    public noBlockCollisionDetection(blocks: TetrisBlock[]): boolean {
        return blocks
            .filter(block => block.yPos > this.numOfBlocksHigh - 1 || this.isBlockAtPosition(block.xPos, block.yPos))
            .length > 0;
    }

    public detectFullRows(): number[] {
        let rowNumbersWhoAreFull: number[] = [];
        for (let i = 0; i < this.numOfBlocksHigh; i++) {
            if (this.blocksMap.get(i)!.length === this.numOfBlocksWide) {
                rowNumbersWhoAreFull.push(i);
            }
        }
        return rowNumbersWhoAreFull;
    }

    public removeRow(rowIndex: number) {
        for (let i = rowIndex; i >= 1; i--) {
            this.blocksMap.set(i, this.blocksMap.get(i - 1)!);
            for (let block of this.blocksMap.get(i)!) {
                block.yPos = i;
            }
        }
        this.blocksMap.set(0, []);
    }

    private collisionDetected(block: TetrisBlock): boolean {
        return block.xPos < 0 || block.xPos > this.numOfBlocksWide - 1 || block.yPos > this.numOfBlocksHigh - 1 ||
            this.isBlockAtPosition(block.xPos, block.yPos)
    }

    private isBlockAtPosition(x: number, y: number): boolean {
        if (y < 0) {
            return false;
        }
        for (let block of this.blocksMap.get(y)!) {
            if (block.xPos === x && block.yPos === y) {
                return true;
            }
        }
        return false;
    }
}