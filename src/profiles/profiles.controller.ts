import { Controller, Get, Query, Param, Post, Body, Put, Delete, HttpCode, HttpStatus, HttpException, NotFoundException} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

// A query parameter is a key-value pair that is appended to the end of a URL. In this case, the @Query() decorator is used to extract query parameters from the request URL. The findAll() method can accept query parameters to filter or modify the response.
// Param is used to extract route parameters from the URL. For example, if you have a route defined as /profiles/:id, you can use the @Params() decorator to extract the id parameter from the URL and use it in your controller method.


// The controller layer is responsible for handling incoming requests and returning responses to the client. In this case, the ProfilesController class is defined to handle requests related to profiles. The @Controller('profiles') decorator indicates that this controller will handle requests to the /profiles endpoint.

@Controller('profiles') // Here, we define a controller class called ProfilesController. The @Controller('profiles') decorator indicates that this controller will handle requests to the /profiles endpoint.
export class ProfilesController {
constructor(private profilesService: ProfilesService){} // The constructor of the ProfilesController class takes an instance of the ProfilesService as a parameter. This is an example of dependency injection, where the service is injected into the controller to allow it to use the methods defined in the service to handle business logic related to profiles. In a real application, you would typically implement methods in the ProfilesController class to handle incoming requests and return responses based on the business logic defined in the ProfilesService.

    // GET /profiles

    @Get() // These are called decorators, they add metadata to the class and its methods. In this case, @Get() indicates that the findAll() method should handle GET requests to the /profiles endpoint.
    findAll(){
        return this.profilesService.findAll();
    }

  // GET /profiles/:id

  @Get(':id') // The @Get(':id') decorator indicates that the findOne() method should handle GET requests to the /profiles/:id endpoint, where :id is a route parameter that can be accessed using the @Params() decorator.
  findOne(@Param('id') id: string){
  return this.profilesService.findOne(id); // The findOne() method takes the id parameter from the URL and returns it in the response. In a real application, you would typically use this id to fetch the corresponding profile from a database or another data source.
  // throw new NotFoundException(); // The throw new NotFoundException('Not Found', HttpStatus.NOT_FOUND) line is used to throw a not found exception with a 404 status code. This is typically done when the requested resource (in this case, a profile with the specified id) is not found in the database or data source. The NotFoundException class is provided by NestJS and allows you to create custom error responses for your API endpoints.
  
  }

  // POST /profiles
  
  @Post() // The @Post() decorator indicates that the create() method should handle POST requests to the /profiles endpoint.
  create(@Body() createProfileDto: CreateProfileDto){
    // We're creating a new object here
    return this.profilesService.create(createProfileDto) // The create() method takes the data from the request body (createProfileDto) and returns it in the response. In a real application, you would typically use this data to create a new profile in a database or another data source.
    }
  

  // Note: DTO - // A Data Transfer Object (DTO) is a design pattern used to transfer data between software application subsystems. In the context of NestJS, DTOs are often used to define the shape of data that is sent in requests or returned in responses. They help ensure that the data being transferred adheres to a specific structure and can be validated before being processed by the application.
  
  // PUT /profiles/:id

  @Put(':id') // The @Put(':id') decorator indicates that the update() method should handle PUT requests to the /profiles/:id endpoint, where :id is a route parameter that can be accessed using the @Params() decorator.
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto
  ){
    return this.profilesService.update(id, updateProfileDto); // The update() method takes the id parameter from the URL and the data from the request body (updateProfileDto) and returns it in the response. In a real application, you would typically use this data to update an existing profile in a database or another data source.
  }

  // DELETE /profiles/:id
  @Delete(':id') // The @Delete(':id') decorator indicates that the remove() method should handle DELETE requests to the /profiles/:id endpoint, where :id is a route parameter that can be accessed using the @Params() decorator.
  @HttpCode(HttpStatus.NO_CONTENT) // The @HttpCode(HttpStatus.NoContent) decorator is used to set the HTTP status code of the response. In this case, it sets the status code to 204 (No Content) for successful deletion.
  remove(@Param('id') id: string){
    return this.profilesService.delete(id); // The remove() method takes the id parameter from the URL and returns it in the response. In a real application, you would typically use this id to delete the corresponding profile from a database or another data source.
  }

}
