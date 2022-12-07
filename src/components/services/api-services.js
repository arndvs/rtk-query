// RTK Query is a powerful tool for fetching data from an API and managing the state of that data in your application.
// It is built on top of Redux Toolkit and uses the same core APIs, so you should already be familiar with the concepts of reducers, actions, and selectors.
// https://redux-toolkit.js.org/rtk-query/overview

import {
    createApi,
    fetchBaseQuery
  } from "@reduxjs/toolkit/query/react"; // bring in the createApi and fetchBaseQuery functions from the reduxjs toolkit query package

  export const apiService = createApi({ // one api per base url -  service/Api slice is a collection of endpoints via createApi function and is passed passed a configuration object
    reducerPath: "apiService", // This is a unique key that defines where the Redux store will store the cache
    baseQuery: fetchBaseQuery({ // baseQuery is a function that returns a promise. The base query used by each endpoint to request data. Here as its value, we passed fetchBaseQuery, which allows us to build a query by just providing the base URL.
      baseUrl: "http://localhost:5000/" // baseUrl is the base URL for all requests
    }),

    // TAGTYPES
    // Using tagTypes to refetch data after a mutation:
    // SEE MORE: cache tag system to automate refetching:
    // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching
    // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tags

    // the most efficient way is to use the cache tag system so that we won’t have to call the refetch function whenever data is affected by a mutation endpoint.
    // How does cache tag system work?

    // When a mutation hook is triggered, caches from queries will be invalidated, which will cause an auto refetching and updating of the caches.

    tagTypes: ["Task"], // Declare the the Tag(s) in the tagTypes array.  The tag names are then provided to caches using the providesTags property.
    // In summary, We added a tagType name called Task. It's added to the query endpoint below using providesTags, and used it in the mutation endpoints via invalidatesTags.
    // With this, any time we trigger mutation hooks for adding, updating, or deleting data, our UI will be updated with mutated data.


    // ENDPOINTS
    // endpoints are the set of operations that we want to perform against the server.
        // - Query endpoints are requests that retrieve and read data from the server
        // - Mutation endpoints are requests that create, update, or delete data on the server
            // below are four endpoints for reading, adding, updating, and deleting data from the db.json file
    endpoints: (builder) => ({ // endpoints are similar to reducers in Redux. They are functions that return an object with the query/mutation endpoints.
        tasks: builder.query({  // tasks is a query endpoint.
          query: () => "/tasks", // gather all the tasks in the db.json file. The URL for this endpoint will be constructed by joining the base URL with “/tasks”.
          providesTags: ["Task"] // providesTags is an array of tags that will be added to the cache when this endpoint is fulfilled.
        }),
        addTask: builder.mutation({ // addTask is a mutation endpoint to add new tasks to the JSON data
          query: (task) => ({  // receives task as an argument which will be the data to be added
            url: "/tasks",
            method: "POST", // POST method to add new data
            body: task // attaches task data received to the body of the POST request sent to the server.
          }),
          invalidatesTags: ["Task"] // invalidatesTags is an array of tags that will be removed from the cache when this endpoint is fulfilled.
        }),
        updateTask: builder.mutation({ // updateTask is a mutation endpoint to update existing tasks in the JSON data
          query: ({ id, ...rest }) => ({
            url: `/tasks/${id}`,
            method: "PUT",
            body: rest
          }),
          invalidatesTags: ["Task"]
        }),
        deleteTask: builder.mutation({ // deleteTask is a mutation endpoint to delete existing tasks in the JSON data
          query: (id) => ({
            url: `/tasks/${id}`,
            method: "DELETE"
          }),
          invalidatesTags: ["Task"]
        })

    })
    });

    // EXPORT THE HOOKS
    // After endpoints are defined, we can use the generated hooks to make requests to the server.
    // The names of hooks generated take the form use<endpoint name><endpoint type> in camelCase.
    export const {
        useTasksQuery,
        useAddTaskMutation,
        useUpdateTaskMutation,
        useDeleteTaskMutation
      } = apiService;
