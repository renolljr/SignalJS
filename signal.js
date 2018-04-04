

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
        return [i+1, j, s[i+1][j]]; 
    }

    const getBottom = (point) => {
        let [i,j] = point;
        return [i-1, j, s[i-1][j]]
    }

    const getLeft = (point) => {
        let [i,j] = point;
        return [i, j-1, s[i][j-1]];
    }

    const getRight = (point) => {
        let [i,j] = point;
        return [i, j+1, s[i][j+1]];
    }

    const getTopLeft = (point) => {
        let [i,j] = point;
        return [i+1, j-1, s[i+1][j-1]];
    }

    const getBottomLeft = (point) => {
        let [i,j] = point;
        return [i-1, j-1, s[i-1][j-1]];
    }

    const getTopRight = (point) => {
        let [i,j] = point;
        return [i+1, j+1, s[i+1][j+1]];
    }
   
    const getBottomRight = (point) => {
        let [i,j] = point;
        return [i-1, j+1, s[i-1][j+1]];
    }
    
    const getStateSpace = (point) => {
        return [   
             hasTop(point) ? getTop(point) : undefined,
             hasBottom(point) ? getBottom(point) : undefined,
             hasLeft(point) ? getLeft(point) : undefined,
             hasRight(point) ? getRight(point) : undefined,
             hasTopLeft(point) ? getTopLeft(point) : undefined,
             hasBottomLeft(point) ? getBottomLeft(point) : undefined,
             hasTopRight(point) ? getTopRight(point) : undefined,
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
    for(let point of disjoint){
        if(!explored.has(point.join())){
            let neighbors = getStateSpace(point);
            let minX = Infinity,
                maxX = -Infinity,
                minY = Infinity,
                maxY = -Infinity;
    
            let clusterSize = 0;

            while(neighbors !== undefined && neighbors.length > 0){
                let signal = neighbors.pop();
                if(signal !== undefined){
                    let [i,j,val] = signal;
                    if(!explored.has([i,j].join())){
                    
                        explored.add([i,j].join());
                        clusterSize+=1;

                        if (i < minX){ minX = i; }
                        if (i > maxX){ maxX = i; }
                        if (j < minY){ minY = j; }
                        if (j > maxY){ maxY = j; }
                    
                        let newItems = getStateSpace([i,j]); //add to neighbors and continue
                        while(newItems.length > 0){
                            let top = newItems.pop();
                            if(top !== undefined){
                                let [a,b,c] = top;
                                if (!explored.has([a,b].join())){
                                    neighbors.push(top);
                                } 
                            }
                        }

                    }
                }
                
            }

            let x_center = 0;
            if(maxX != minX){
                x_center = (maxX + minX)/2;
            }
            else{
                x_center = maxX;
            }

            //let y_center = maxY != minY ? (maxY + minY)/2 : y_center = maxY;
            let y_center = 0;
            if(maxY != minY){
                y_center = (maxY + minY)/2
            }
            else{
                y_center = maxY;
            }

            let center = [x_center, y_center];
            if(clusterSize <= 2){
                centerOfMass.push(point);
            }
            else{
                centerOfMass.push(center);
            }
          
        }
        
    }
    console.log(centerOfMass);
    return centerOfMass;
    
}

main();
