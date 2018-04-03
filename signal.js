

// JavaScript source code

function main(s = [
	                [5, 0, 25, 5, 145, 250],
	                [0, 5, 95, 115, 165, 250],
	                [15, 5, 175, 250, 185, 160],
	                [5, 0, 145, 250, 245, 140],
	                [115, 210, 60, 5, 230, 220],
	                [0, 80, 45, 95, 170, 145]
                ],threshold = 200){

    const hasTop = (point) => {
        let [i,j] = point;
        if(i > s.length - 1) return false;
        if(s[i+1][j] >= threshold){
            return true;
        }
        else
            return false;
    }

    const hasBottom = (point) => {
        let [i,j] = point;
        if(i<1) return false;
        if(s[i-1][j] >= threshold){
            return true;
        }
        else
            return false;
    }

    const hasLeft = (point) => {
        let [i,j] = point;
        if(j<1) return false;
        if(s[i][j-1] >= threshold){
            return true;
        }
        else
            return false;
    }

    const hasRight = (point) => {
        let [i,j] = point;
        if(j > s.length - 1) return false;
        if(s[i][j+1] >= threshold){
            return true;
        }
        else
            return false;
    }

    const hasTopLeft = (point) => {
        let [i,j] = point;
        if(i > s.length - 1) return false;
        if(j < 1) return false;
        if(s[i+1][j-1] >= threshold){
            return true;
        }
        else
            return false;
    }

    const hasBottomLeft = (point) => {
        let [i,j] = point;
        if(i < 1) return false;
        if(j < 1) return false;
        if(s[i-1][j-1] >= threshold){
            return true;
        }
        else
            return false;
    }

    const hasTopRight = (point) => {
        let [i,j] = point;
        if(i > s.length - 1) return false;
        if(j > s.length - 1) return false;
        if(s[i+1][j+1] >= threshold){
            return true;
        }
        else
            return false;
    }

    const hasBottomRight = (point) =>{
        let [i,j] = point;
        if(i < 1) return false;
        if(j > s.length - 1) return false;
        if(s[i-1][j+1] >= threshold){
            return true;
        }
        else
            return false;
    }

    const getTop = (point) => {
        let [i,j] = point; 
        return s[i+1][j]; 
    }

    const getBottom = (point) => {
        let [i,j] = point;
        return s[i-1][j]
    }

    const getLeft = (point) => {
        let [i,j] = point;
        return s[i][j-1];
    }

    const getRight = (point) => {
        let [i,j] = point;
        return s[i][j+1];
    }

    const getTopLeft = (point) => {
        let [i,j] = point;
        return s[i+1][j-1];
    }

    const getBottomLeft = (point) => {
        let [i,j] = point;
        return s[i-1][j-1];
    }

    const getTopRight = (point) => {
        let [i,j] = point;
        return s[i+1][j+1];
    }
   
    const getBottomRight = (point) => {
        let [i,j] = point;
        return s[i-1][j+1];
    }
    
    const getStateSpace = (point) => {
        return [   
             hasTop(point) ? getTop(point) : undefined,
             hasBottom(point) ? getBottom(point) : undefined,
             hasLeft(point) ? getLeft(point) : undefined,
             hasRight(point) ? getRight(point) : undefined,
             hasTopLeft(point) ? getTopLeft(point) : undefined,
             hasBottomLeft(point) ? getBottomLeft(point) : undefined,
             hasTopRight(point) ? getBottomRight(point) : undefined,
             hasBottomRight(point) ? getBottomRight(point) : undefined 
        ]
    };

    const size = s.length; // assume s.length and s[0].length size are fixed.
    
    let disjoint = new Set([]);
    let explored = new Set([]);
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if(s[i][j] >= threshold ){
                disjoint.add([i,j])
            }
        }
    }
    
    let centerOfMass = [];
	
	//need to save high and low, of x,y, use DFS, construct and return list 
    for(let point of disjoint){

        if(!explored.has(point)){
            explored.add(point);

            let expand = false;
            let neighbors = getStateSpace(point);
            
            for(let signal of neighbors){    
                if(typeof(signal) !== "undefined"){
                    if(signal >= 200){
                        expand = true;
                        //explore by expanding MB

                        //add to explored 
                        //explored.add(section);
                    }
                }
            }
            //if(!hasMB){
            //    centerOfMass.push(point);
            //}
        }
    }
    return centerOfMass;
}

main();
