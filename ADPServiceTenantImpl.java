package cn.com.hszl.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.com.hszl.biz.ds.form.TenantForm;
import cn.com.hszl.biz.intf.ITenantService;
import cn.com.hszl.services.intf.IADPServiceTenant;

@Component
public class ADPServiceTenantImpl implements IADPServiceTenant{
    @Autowired
    private ITenantService tenantService;
	@Override
	public TenantForm addTenant(TenantForm tenant) {
		return tenantService.addTenant(tenant);
	}
	
	@Override
	public List<TenantForm> listTenants() {
		return tenantService.listTenant();
	}
	

}
