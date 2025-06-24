const VITE_BASE_URL="http://10.0.2.2:5124/api"
// const VITE_BASE_URL="https://10.0.2.2:7109/api"



export const GetNewReleaseMovies = async (page,moviesPerPage,selectedLanguage) => {
    try {
        const response=await fetch(`${VITE_BASE_URL}/Movie/GetNewReleaseMovies?page=${page}&moviesPerPage=${moviesPerPage}&language=${selectedLanguage}`)
        const data = await response.json()
        return data;
    }  
    catch(error){
        console.error(error)
    }
}

export const GetUpcomingMovies = async (selectedLanguage) => {
    try {
        const response = await fetch(`${VITE_BASE_URL}/Movie/GetUpcomingMovies?language=${selectedLanguage}`)
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const GetTopRatedMovies = async (selectedLanguage) => {
    try {
        const response = await fetch(`${VITE_BASE_URL}/Movie/GetTopRatedMovies?language=${selectedLanguage}`)
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const GetSearchedMovies = async (searchQuery,page,moviesPerPage,selectedLanguage) => {
    try {
        const response=await fetch(`${VITE_BASE_URL}/Movie/GetSearchedMovie?query=${searchQuery}&page=${page}&moviesPerPage=${moviesPerPage}&language=${selectedLanguage}`)
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const GetSearchedPerson = async (searchQuery,page,personPerPage,selectedLanguage) => {
    try {
        const response=await fetch(`${VITE_BASE_URL}/Movie/GetSearchedPerson?query=${searchQuery}&page=${page}&personPerPage=${personPerPage}&language=${selectedLanguage}`)
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const GetFavouriteProfessionalMovies = async () => {
    try {

        response=await fetch(`${VITE_BASE_URL}/Favourite/GetFavouriteProfessionalMovies`);
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
    const response = await fetch(`${VITE_BASE_URL}/Auth/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const contentType = response.headers.get("Content-Type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const message = await response.text();
      data = { success: false, message };
    }

    if (!response.ok) {
      return { success: false, message: data.message || 'Invalid username or password.' };
    }
    return { success: true, ...data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Server error occurred." };
  }
};


export const RegisterFetch = async (formData) => {
    try {

        const response = await fetch(`${VITE_BASE_URL}/Auth/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData)
        })

        const text = await response.text()
        if(response.ok){
            return{success:true,message:text};
        }else{
            return{success:false,message:text};
        }


    }  
    catch(error) {
        console.error(error);
    return { success: false, message: "Server error occurred." };    }
}

export const ForgotPasswordFetch=async(formData)=>{
    try{
        const response=await fetch(`${VITE_BASE_URL}/Auth/ForgotPassword`,{
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


export const GetAccountData = async () => {
    try {
        const response = await fetch(`${VITE_BASE_URL}/Account/GetAccountData`)
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const UpdateAccount = async (formData) => {
    try {

        const response = await fetch(`${VITE_BASE_URL}/Account/UpdateAccount`, {
            method: "PUT",
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

export const GetSimilarMovies = async (id,language) => {
    try {
        const response=await fetch(`${VITE_BASE_URL}/Movie/GetInterestedMovies?movieid=${id}&language=${language}}`);
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}


export const GetMovieDetails = async (id,title,language) => {
    try {
        const response=await fetch(`${VITE_BASE_URL}/Movie/GetMovieDetails?movieid=${id}&title=${title}&language=${language}`);
        const data = await response.json()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const GetTrailer = async (id,language) => {
    try {
        const response=await fetch(`${VITE_BASE_URL}/Movie/GetTrailer?movieid=${id}&language=${language}`);
        const data = await response.text()
        return data;
    }  
    catch(error) {
        console.error(error)
    }
}

export const AddToFavourites = async (id) => {
    try {
        const response = await fetch(`${VITE_BASE_URL}/Favourite/AddToFavourites?movieId=${id}`, {
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
        const response = await fetch(`${VITE_BASE_URL}/Favourite/DeleteFromFavourites?movieId=${movieid}`, {
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

export const GetMovieEmbedLink=async(movieid,title,year)=>{
    try{
        const response=await fetch(`${VITE_BASE_URL}/Movie/GetMovieEmbedLink?movieid=${movieid}&title=${title}&year=${year}`);
        const data=await response.json();
        return data;
    }
    catch(error){
        console.error(error);
    }
}

export const SetLikeCount = async (movieid, isLikeButton) => {
    try {
        const response = await fetch(`${VITE_BASE_URL}/BaseMovie/SetLikeCount?movieid=${movieid}&isLikeButton=${isLikeButton}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
        });
        const data=await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const SetViewCount=async(movieid)=>{
    try{
        const response= await fetch(`${VITE_BASE_URL}/BaseMovie/SetViewCount?movieid=${movieid}`,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            }
        });
        const data=await response.text();
        return data;
    }
    catch(error){
        console.error(error);
    }
}

export const GetAllPersonalMovies=async()=>{
    try{
        const response=await fetch(`${VITE_BASE_URL}/PersonalMovie/GetAllPersonalMovies`);
        const data=await response.json();
        return data;
    }
    catch(error){
        console.error(error);
    }
}
    
export const GetComments = async (movieid)=>{
    try{
        const response=await fetch(`${VITE_BASE_URL}/Comment/GetComments?movieid=${movieid}`);
        const data=await response.json();
        return data;
    }catch(error){
        console.error(error);
    }
}
export const AddComment = async (movieid,content)=>{
    try{
        const response=await fetch(`${VITE_BASE_URL}/Comment/AddComment?movieid=${movieid}&content=${content}`,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            }
        });
        const data=await response.json();
        return data;
    }catch(error){
        console.error(error);
    }
}

export const LikeComment = async (commentId)=>{
    try{
        const response=await fetch(`${VITE_BASE_URL}/Comment/LikeComment?commentid=${commentId}`,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            }
        });
        const data=await response.json();
        return data;
    }catch(error){
        console.error(error);
    }
}

export const DeleteComment = async (commentId)=>{
    try{
        const response=await fetch(`${VITE_BASE_URL}/Comment/DeleteComment?commentid=${commentId}`,{
            method:'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
        });
         const data=await response.text();
         console.log(data);
        return data;
    }
    catch(error){
        console.error(error);
    }
}

