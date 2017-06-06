package kr.or.connect.todo.persistence;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

import java.util.Collection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.todo.TodoApplication;
import kr.or.connect.todo.domain.Todo;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = TodoApplication.class)
@Transactional
public class TodoDaoTest {
	
	@Autowired
	private TodoDao dao;


 
	@Test
	public void shouldInsertAndSelect() {
		// given
		Todo todo = new Todo("testTodo1");

		// when
		Integer id = dao.insert(todo);

		// then
		Todo selected = dao.selectedById(id);
		System.out.println(selected.toString());
		assertThat(selected.getTodo(), is("testTodo1"));
	}
	
	@Test
	public void shouldDelete() {
		//given
		Todo todo = new Todo("testTodo1");
		int testId = dao.insert(todo);
		
		//when
		int affected = dao.deleteById(testId);
		
		//then
		assertThat(affected,is(1));
	}
	
	@Test
	public void shouldSelectOrderBY() {
		
		//given
		Todo todo = new Todo("testTodo1");
		int id1 = dao.insert(todo);
		
		Todo todo1 = new Todo("testTodo2");
		int id2 = dao.insert(todo1);
		
		todo = dao.selectedById(id1);
		todo1 = dao.selectedById(id2);
		
		//when
		Collection<Todo> todoList = dao.selectAll();
		
		//then
		assertThat(todoList,is(notNullValue()));
	}


}

