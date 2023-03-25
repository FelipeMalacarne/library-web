package com.demolib.springbootlibrary.dao;

import com.demolib.springbootlibrary.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
