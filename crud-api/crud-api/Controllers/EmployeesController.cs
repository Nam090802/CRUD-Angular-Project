using crud_api.Data;
using crud_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace crud_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly AppDbContext _appDbContext;

        public EmployeesController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;        
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _appDbContext.Employees.ToListAsync();
            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employeeRequest)
        {
            await _appDbContext.Employees.AddAsync(employeeRequest);
            await _appDbContext.SaveChangesAsync();
            return Ok(employeeRequest);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetEmployee([FromRoute] int id)
        {
            var employees = await _appDbContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if(employees == null)
            {
                return NotFound();
            }
            return Ok(employees);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] int id, Employee updateEmployee)
        {
            var employee = await _appDbContext.Employees.FindAsync(id);
            if(employee == null)
            {
                return NotFound();
            }
            employee.Name = updateEmployee.Name;
            employee.Email = updateEmployee.Email;
            employee.Phone = updateEmployee.Phone;
            employee.Salary = updateEmployee.Salary;
            employee.Department = updateEmployee.Department;

            await _appDbContext.SaveChangesAsync();
            return Ok(employee);

        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            var employee = await _appDbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            _appDbContext.Employees.Remove(employee);
            await _appDbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
