package cn.com.hszl.biz.impl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.com.hszl.base.ADPAbstractBaseDaoImpl;
import cn.com.hszl.base.ADPAbstractBaseServiceImpl;
import cn.com.hszl.biz.ds.form.TenantForm;
import cn.com.hszl.biz.impl.dao.TenantDaoImpl;
import cn.com.hszl.biz.intf.ITenantService;

@Component
public class TenantServiceImpl extends ADPAbstractBaseServiceImpl<TenantForm, Integer> implements ITenantService {
	@Autowired
	private TenantDaoImpl tenantDAOImpl;

	@Override
	public TenantForm addTenant(TenantForm tenant) {
		
		return this.getDao().insert(tenant);
	}

	@Override
	public List<TenantForm> listTenant() {
		// TODO Auto-generated method stub
		return this.getDao().list(null);
	}

	@Override
	protected ADPAbstractBaseDaoImpl<TenantForm, Integer> getDao() {
		// TODO Auto-generated method stub
		return tenantDAOImpl;
	}

}
