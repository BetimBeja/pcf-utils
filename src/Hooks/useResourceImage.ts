import {useState, useEffect } from 'react';

export const useResourceImage = (resources: any, resourceName: string, fileType : string ) => { 
    const [imageSrc, setImageSrc ] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean|undefined>();
    const [errorMessage, setErrorMessage] = useState<string|undefined>();

    useEffect(() => {
        if(resourceName==null || resourceName ==="") {
            return;
        }
        setIsLoading(true);
        resources.getResource(resourceName, (fileContent : string)=> {
            setImageSrc(`data:image/${fileType};base64,${fileContent}`);
            setIsLoading(false);
        }, (e:any)=> {
            console.error(e);
            setErrorMessage(e?.message ?? e);
        })
    }, [resourceName, fileType]);

    return {src: imageSrc, isLoading, errorMessage};
}