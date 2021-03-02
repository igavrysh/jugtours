package com.okta.developer.jugtours.model;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "user_group")
public class Group {

    @Id
    @GeneratedValue
    private  Long id;

    @NotNull
    private String name;
    private String address;
    private String city;
    private String stateOrProvince;
    private String country;
    private String postalCode;
    @ManyToOne(cascade=CascadeType.PERSIST)
    private User user;

    @OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Event> events;

    public Group() {}

    public Group(String name) {
        this.name = name;
    }
}
