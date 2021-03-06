package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String DELETE_BY_ID =
			"DELETE FROM todo WHERE id= :id";
	static final String SELECT_ALL = "SELECT * FROM todo";
	static final String UPDATE = 
			"UPDATE todo SET\n"
			+ "completed = :completed\n"
			+ "WHERE id = :id";
	static final String SELECTED_BY_ID =
			"SELECT * FROM todo WHERE id=:id";
}
