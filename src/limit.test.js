const {beginWithInclude, getStart, endWithInclude, getEnd, range} = require('./limit')

describe('Limit', () => {

    it('Begin With Include', () => {
        const input = "[1,5]"

        expect(beginWithInclude(input)).toBe(true)
    })    

    it('Begin With Exclude', () => {
        expect(() => {
            const input = "xabc,5]"
            beginWithInclude(input)
        }).toThrowError("invalid")
    })

    it('Begin With Exclude', () => {
        const input = "(1,5]"

        expect(beginWithInclude(input)).toBe(false)
    })

    it('Begin Include 1 Should Be 1', () => {
        const input = "[1,5]"

        expect(getStart(input)).toBe(1)
    });

    it('Begin Exclude 1 Should Be 2', () => {
        const input = "(1,5]"
        
        expect(getStart(input)).toBe(2)     
    });

    it('Begin Exclude 10 Should Be 11', () => {
        const input = "(10,5]"
        
        expect(getStart(input)).toBe(11)     
    });

    it('Begin Exclude -1 Should Be 0', () => {
        const input = "(-1,5]"
        
        expect(getStart(input)).toBe(0)   
    });

    it('Begin Include -1 Should Be -1', () => {
        const input = "[-1,5]"
        
        expect(getStart(input)).toBe(-1)   
    });

    it('getStart abc invalid', () => {

        expect(() => {
            const input = "[abc,5]"
            getStart(input)
        }).toThrowError("invalid")
    })    

    it('End With Include', () => {
        const input = "(1,5]"

        expect(endWithInclude(input)).toBe(true)
    })

    it('End With Random', () => {
        expect(() => {
            const input = "[abc,5x"
            endWithInclude(input)
        }).toThrowError("invalid")
    })


    it('End Include 5 Should Be 5', () => {
        const input = "[1,5]"
        
        expect(getEnd(input)).toBe(5)
    });

    it('End Exclude 5 Should Be 4', () => {
        const input = "[1,5)"
        
        expect(getEnd(input)).toBe(4)
    });

    it('End Exclude 50 Should Be 49', () => {
        const input = "[1,50)"
        
        expect(getEnd(input)).toBe(49)
    });

    it('Range [1,5] Should Be 1,2,3,4,5', () => {
        const expected = "1,2,3,4,5"
        const input = "[1,5]"
        
        expect(expected).toBe(range(input))
    });

    it('Range (1,5] Should Be 2,3,4,5', () => {
        const expected = "2,3,4,5"
        const input = "(1,5]"
        
        expect(expected).toBe(range(input))
    });

    it('Range (1,5) Should Be 2,3,4', () => {
        const expected = "2,3,4"
        const input = "(1,5)"
        
        expect(expected).toBe(range(input))
    });

    it('Range (11,5) Should Be Error', () => {
        expect(() => {
            const input = "(11,5)"
            range(input)
        }).toThrowError("invalid")
    });
});