export const GetNewReleaseMovies = async (page,moviesPerPage,selectedLanguage) => {
    try {
        const response=await fetch(`http://10.0.2.2:5124/api/Movie/GetNewReleaseMovies?page=${page}&moviesPerPage=${moviesPerPage}&language=${selectedLanguage}`)
        const data = await response.json()
        return data;
    }  
    catch(error){
        console.error(error)
    }
}

export const GetUpcomingMovies = async (selectedLanguage) => {
    try {
        const response = await fetch(`http://10.0.2.2:5124/api/Movie/GetUpcomingMovies?language=${selectedLanguage}`)
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const GetTopRatedMovies = async (selectedLanguage) => {
    try {
        const response = await fetch(`http://10.0.2.2:5124/api/Movie/GetTopRatedMovies?language=${selectedLanguage}`)
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const GetSearchedMovies = async (searchQuery,page,moviesPerPage,selectedLanguage) => {
    try {
        const response=await fetch(`http://10.0.2.2:5124/api/Movie/GetSearchedMovie?query=${searchQuery}&page=${page}&moviesPerPage=${moviesPerPage}&language=${selectedLanguage}`)
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const GetSearchedPerson = async (searchQuery,page,personPerPage,selectedLanguage) => {
    try {
        const response=await fetch(`http://10.0.2.2:5124/api/Movie/GetSearchedPerson?query=${searchQuery}&page=${page}&personPerPage=${personPerPage}&language=${selectedLanguage}`)
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const GetFavouriteProfessionalMovies = async () => {
    try {

        response=await fetch("http://10.0.2.2:5124/api/Favourite/GetFavouriteProfessionalMovies");
        const data = await response.json()
        let movieList=[]
        
        for (let index = 0; index < data.length; index++) {

            const response = await fetch(`https://api.themoviedb.org/3/movie/${data[index]}`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2I3OWYxNmU2NWFmMGY1YTBjNGY4ZGFkZDdkMDhjNCIsInN1YiI6IjY0YjA0MzFjMjBlY2FmMDBjNmY2MWQ1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VErhjbegJJ2tyZVP-GiDRN_gTcH_MYVhQ1wThi0Ytb0',
                },
            });
            const movie=await response.json()
            if(movie) {
                movieList.push(movie);
            }
        }
        return movieList;
        // id stringler return olunur for-un icine salib her birini getById ile fetch elemek lazimdi
    }  
    catch(error) {
        console.error(error)
    }
}


export const LoginFetch = async (formData) => {
    try {

        const response = await fetch("http://10.0.2.2:5124/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData)
        })

        const data = await response.json()
        console.log(data)
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}


export const RegisterFetch = async (formData) => {
    try {

        const response = await fetch("http://10.0.2.2:5124/api/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData)
        })

        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const ForgotPasswordFetch=async(formData)=>{
    try{
        const response=await fetch("http://10.0.2.2:5124/api/Auth/ForgotPassword",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body:JSON.stringify(formData)
        })
        if (!response.ok) {
        const errorText = await response.text();
        return { success: false, message: errorText };
    }
    if (!response.ok) {
      return { success: false, message: "Failed to send reset link. Please try again." };
    }
    return { success: true, message: "Reset link sent successfully. Please check your email." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "An error occurred. Please try again later." };
  }
}

export const GetSimilarMovies = async (id,language) => {
    try {
        const response=await fetch(`http://10.0.2.2:5124/api/Movie/GetInterestedMovies?movieid=${id}&language=${language}}`);
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}


export const GetMovieDetails = async (id,title,language) => {
    try {
        const response=await fetch(`http://10.0.2.2:5124/api/Movie/GetMovieDetails?movieid=${id}&title=${title}&language=${language}`);
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const GetTrailer = async (id,language) => {
    try {
        const response=await fetch(`http://10.0.2.2:5124/api/Movie/GetTrailer?movieid=${id}&language=${language}`);
        const data = await response.text()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const AddToFavourites = async (id) => {
    try {
        const response = await fetch(`http://10.0.2.2:5124/api/Favourite/AddToFavourites?movieId=${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
        });
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}


export const DeleteFromFavourites = async (movieid) => {
    try {
        const response = await fetch(`http://10.0.2.2:5124/api/Favourite/DeleteFromFavourites?movieId=${movieid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    catch(error) {
        console.error(error)
    }
    
}