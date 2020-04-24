package cn.com.hszl.biz.ds.entity;

import cn.com.hszl.base.ADPBaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class TenantEntity extends ADPBaseEntity{
	private static final long serialVersionUID = -3992867295042792759L;
	private String tenantId;
    /***  ***/
	private String tenantName;
  	/***  ***/
	private String tenantAddress;
  	/*** ***/
	private String tel;
  	/***  ***/
	private String contantPerson;
  	/***  ***/
	private String phone;
}
